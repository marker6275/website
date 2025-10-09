"use client";

import { useState } from "react";
import { Toast } from "../../popups";
import { HeaderProfilePicture } from "./HeaderProfilePicture";
import { HeaderName } from "./HeaderName";
import { HeaderSubtitle } from "./HeaderSubtitle";
import {
  HeaderEmailIcon,
  HeaderInstagramIcon,
  HeaderGithubIcon,
  HeaderLinkedinIcon,
} from "./HeaderIcons";

export function SectionHeader() {
  const [showToast, setShowToast] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  return (
    <div className="my-4 sm:my-8 mx-4">
      <div className="flex justify-center items-center duration-300">
        <HeaderProfilePicture />
        <div className="sm:ml-8">
          <HeaderName />
          <HeaderSubtitle />
          <div className="flex gap-4 sm:gap-6 space-between mt-2 ml-1 duration-300">
            <HeaderEmailIcon
              showToast={showToast}
              setShowToast={setShowToast}
              setIsFadingOut={setIsFadingOut}
            />
            <HeaderInstagramIcon />
            <HeaderGithubIcon />
            <HeaderLinkedinIcon />
          </div>
        </div>
      </div>
      {showToast && (
        <Toast message="Email copied to clipboard!" isFadingOut={isFadingOut} />
      )}
    </div>
  );
}
