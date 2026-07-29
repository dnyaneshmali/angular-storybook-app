import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'nexusUI',
  }),
});

if (typeof window !== 'undefined') {
  const cleanMenu = () => {
    // 1. Hide the target menu items
    const items = document.querySelectorAll('a, button, [role="menuitem"], [class*="menu-item"], [class*="MenuItem"]');
    items.forEach((item) => {
      const text = item.textContent?.trim();
      if (text) {
        if (
          text.includes('About your Storybook') ||
          text.includes('Onboarding guide') ||
          text.includes('Keyboard shortcuts') ||
          text === 'Documentation'
        ) {
          (item as HTMLElement).style.display = 'none';
          // Also hide parent wrappers if any (e.g. li)
          const parent = item.parentElement;
          if (parent && (parent.tagName === 'LI' || parent.getAttribute('role') === 'none')) {
            parent.style.display = 'none';
          }
        }
      }
    });

    // 2. Hide orphaned separators in any menu/tooltip container
    const menus = document.querySelectorAll('[role="menu"], [role="dialog"], [class*="popover"], [class*="tooltip"], [class*="Tooltip"], [class*="Menu"]');
    menus.forEach((menu) => {
      const separators = menu.querySelectorAll('hr, [role="separator"], [class*="separator"], [class*="Separator"]');
      separators.forEach((sep) => {
        const sepEl = sep as HTMLElement;
        const parent = sepEl.parentElement;
        if (!parent) return;

        const children = Array.from(parent.children) as HTMLElement[];
        const visibleChildren = children.filter((child) => {
          return child.style.display !== 'none' && child.offsetHeight !== 0;
        });

        const myIndex = visibleChildren.indexOf(sepEl);
        if (myIndex !== -1) {
          const isFirst = myIndex === 0;
          const isLast = myIndex === visibleChildren.length - 1;
          
          const nextChild = visibleChildren[myIndex + 1];
          const isNextSeparator = nextChild && (
            nextChild.tagName === 'HR' || 
            nextChild.getAttribute('role') === 'separator' || 
            nextChild.className.includes('separator') ||
            nextChild.className.includes('Separator')
          );

          if (isFirst || isLast || isNextSeparator) {
            sepEl.style.display = 'none';
          }
        }
      });
    });
  };

  const observer = new MutationObserver(() => {
    cleanMenu();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
