import Avatar from "../../assets/user-avatar/Avatar";

export default function UserInfo({ user }) {
  return (
    <div className="flex h-fit w-full cursor-pointer flex-nowrap items-center gap-3 overflow-hidden border-t-1 border-[var(--gray)] py-1.75 hover:bg-[var(--gray)]">
      <div className="ml-2 flex max-h-8 min-h-8 max-w-8 min-w-8 justify-center overflow-hidden rounded-md border-[0.75px] border-gray-400">
        <Avatar userName={user.id} />
      </div>
      <div className="max-w-fit overflow-hidden text-sm text-nowrap text-ellipsis text-gray-200">
        {user.name}
      </div>
    </div>
  );
}
