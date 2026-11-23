const navMenus = {
  approver: { title: 'APPROVER', items: ['Approver Flow Management', 'Delegation Management'] },
  setting: { title: 'SETTING', items: ['User Management', 'Role Management', 'LOV Management'] }
};
const drawer = document.querySelector('#nav-drawer');
const railButtons = [...document.querySelectorAll('.rail-item')];
function closeNavDrawer() {
  drawer.hidden = true;
  railButtons.forEach(button => { button.classList.remove('expanded'); if (button.hasAttribute('aria-expanded')) button.setAttribute('aria-expanded','false'); });
}
function openNavDrawer(key) {
  const menu = navMenus[key];
  if (!drawer.hidden && drawer.dataset.menu === key) { closeNavDrawer(); return; }
  closeNavDrawer();
  drawer.dataset.menu = key;
  document.querySelector('#drawer-title').textContent = menu.title;
  document.querySelector('#drawer-links').replaceChildren(...menu.items.map(label => {
    const button = document.createElement('button');
    button.className = 'drawer-link';
    button.textContent = label;
    button.addEventListener('click', () => toast(`${label} is not available in this mockup.`));
    return button;
  }));
  const trigger = document.querySelector(`[data-nav="${key}"]`);
  trigger.classList.add('expanded');
  trigger.setAttribute('aria-expanded','true');
  drawer.hidden = false;
}
railButtons.forEach(button => button.addEventListener('click', () => {
  const key = button.dataset.nav;
  if (navMenus[key]) { openNavDrawer(key); return; }
  closeNavDrawer();
  if (key === 'document') { renderList(); return; }
  toast(`${button.getAttribute('aria-label')} is not available in this mockup.`);
}));
document.querySelector('.drawer-back').addEventListener('click', closeNavDrawer);
document.querySelector('.rail-exit').addEventListener('click', () => toast('Sign out is not available in this mockup.'));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !drawer.hidden) { const trigger = document.querySelector(`[data-nav="${drawer.dataset.menu}"]`); closeNavDrawer(); trigger?.focus(); } });
