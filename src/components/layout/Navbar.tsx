import { useLayout } from './layout-context';

function MenuIcon() {
  return (
    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3 12h18M3 6h18M3 18h18" />
    </svg>
  );
}

function PanelLeftIcon() {
  return (
    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

// Top navigation bar: mobile drawer toggle, desktop sidebar-collapse toggle,
// and a consistent right-side action area (search, notifications, user menu).
export default function Navbar() {
  const { openMobile, toggleCollapse } = useLayout();

  return (
    <nav class="flex items-center h-16 gap-3 px-4 sm:px-6 bg-base-200 shadow-sm sticky top-0 z-10">
      {/* Left: toggles */}
      <div class="flex-none">
        <button
          class="btn btn-ghost btn-square btn-sm lg:hidden"
          onClick={openMobile}
          aria-label="Open sidebar"
        >
          <MenuIcon />
        </button>
        <button
          class="btn btn-ghost btn-square btn-sm hidden lg:inline-flex"
          onClick={toggleCollapse}
          aria-label="Toggle sidebar"
        >
          <PanelLeftIcon />
        </button>
      </div>

      {/* Brand on mobile (sidebar hidden) */}
      <div class="lg:hidden font-bold text-lg tracking-tight">solid-admin</div>

      {/* Search (hidden on smallest screens) */}
      <div class="flex-1 hidden md:flex justify-center px-4">
        <label class="input input-sm input-bordered flex items-center gap-2 w-full max-w-md bg-base-100 rounded-full">
          <SearchIcon />
          <input type="text" class="grow" placeholder="Search…" />
        </label>
      </div>

      {/* Right: actions */}
      <div class="flex-none flex items-center gap-2 ml-auto">
        <button class="btn btn-ghost btn-circle btn-sm" aria-label="Notifications">
          <div class="indicator">
            <BellIcon />
            <span class="indicator-item badge badge-primary badge-xs" />
          </div>
        </button>

        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle btn-sm">
            <div class="avatar placeholder">
              <div class="bg-primary text-primary-content w-9 rounded-full shadow-sm">
                <span class="text-sm">SA</span>
              </div>
            </div>
          </div>
          <ul tabindex="0" class="dropdown-content menu bg-base-100 border border-(--border) rounded-xl mt-3 w-48 p-2 shadow-lg">
            <li><a class="rounded-lg">Profile</a></li>
            <li><a class="rounded-lg">Settings</a></li>
            <li><a class="rounded-lg text-error">Sign out</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
