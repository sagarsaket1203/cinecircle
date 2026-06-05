import {
  Home,
  Film,
  Users,
  Search,
  BarChart3,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 h-screen border-r border-white/10 flex-col p-6 fixed bg-[#0B0D10]">
      <h1 className="text-3xl font-bold">
        Cine
        <span className="text-red-500">
          Circle
        </span>
      </h1>

      <nav className="mt-10 space-y-2">
        <NavItem
          icon={<Home size={20} />}
          label="Home"
          active
        />

        <NavItem
          icon={<Film size={20} />}
          label="Movies"
        />

        <NavItem
          icon={<Users size={20} />}
          label="Friends"
        />

        <NavItem
          icon={<Search size={20} />}
          label="Search"
        />

        <NavItem
          icon={<BarChart3 size={20} />}
          label="Stats"
        />

        <NavItem
          icon={<Settings size={20} />}
          label="Settings"
        />
      </nav>

      <div className="mt-auto">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-red-500"></div>

          <div>
            <p className="font-medium">
              Sagar Kumar
            </p>

            <p className="text-sm text-gray-400">
              @sagar
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function NavItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
        active
          ? "bg-red-600"
          : "hover:bg-white/5"
      }`}
    >
      {icon}

      <span>{label}</span>
    </div>
  );
}