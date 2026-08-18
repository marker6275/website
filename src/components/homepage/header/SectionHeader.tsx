'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Toast } from '@/components/popups';
import { PageBanner } from '@/components/banner';
import {
  HeaderEmailIcon,
  HeaderInstagramIcon,
  HeaderGithubIcon,
  HeaderLinkedinIcon,
} from './HeaderIcons';

export function SectionHeader() {
  const [showToast, setShowToast] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  return (
    <div>
      <PageBanner
        title="Mark Li"
        avatar={
          <Image
            src="/assets/profile_pic.jpg"
            alt="Profile Picture"
            width={96}
            height={96}
            className="size-16 sm:size-36 rounded-full object-cover ring-1 ring-slate-200 shadow-sm saturate-85 contrast-95 brightness-95 shrink-0 select-none"
          />
        }
        accentClassName="border-emerald-200"
        action={
          <div className="flex gap-4 sm:gap-6 duration-300">
            <HeaderEmailIcon
              showToast={showToast}
              setShowToast={setShowToast}
              setIsFadingOut={setIsFadingOut}
            />
            <HeaderInstagramIcon />
            <HeaderGithubIcon />
            <HeaderLinkedinIcon />
          </div>
        }
      />
      {showToast && (
        <Toast message="Email copied to clipboard!" isFadingOut={isFadingOut} />
      )}
    </div>
  );
}
