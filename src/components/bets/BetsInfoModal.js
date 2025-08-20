import Image from "next/image";

export function BetsInfoModal({ showInfoModal, onClick }) {
  return (
    <div className="flex items-center relative hidden lg:block">
      <Image
        src="/assets/icons/information.png"
        alt="information"
        width={15}
        height={15}
        className="cursor-pointer"
        onClick={onClick}
      />
      {showInfoModal && (
        <div className="w-60 h-25 bg-blue-50 flex items-center justify-center absolute -translate-y-1/2 z-50 ml-8 border-1 border-blue-200 rounded-md text-sm font-light p-4">
          If you found this, welcome to my journey to lose money in the worst
          way possible. Enjoy!
        </div>
      )}
    </div>
  );
}
