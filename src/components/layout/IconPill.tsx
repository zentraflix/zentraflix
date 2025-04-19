import { Icon, Icons } from "@/components/Icon";

export function IconPill(props: { icon: Icons; children?: React.ReactNode }) {
  return (
    <div className="bg-denim-400 hover:bg-denim-500 px-4 py-2 rounded-full text-white flex justify-center items-center">
      <Icon
        icon={props.icon ?? Icons.WAND}
        className="mr-3 text-xl text-type-link"
      />
      {props.children}
    </div>
  );
}
