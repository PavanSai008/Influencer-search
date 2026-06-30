import { useEffect, useState } from "react";
import type { Platform, UserProfileSummary } from "@/types";
import {
  getDicebearFallback,
  getProfilePictureFallback,
  resolveProfilePicture,
} from "@/utils/profilePicture";

interface ProfileAvatarProps {
  profile: UserProfileSummary;
  platform?: Platform;
  className?: string;
  alt?: string;
}

export function ProfileAvatar({
  profile,
  platform,
  className,
  alt = "",
}: ProfileAvatarProps) {
  const [src, setSrc] = useState(() => resolveProfilePicture(profile, platform));
  const [usedFallback, setUsedFallback] = useState(false);

  useEffect(() => {
    setSrc(resolveProfilePicture(profile, platform));
    setUsedFallback(false);
  }, [
    profile.picture,
    profile.user_id,
    profile.username,
    profile.handle,
    profile.fullname,
    platform,
  ]);

  const handleError = () => {
    if (usedFallback) {
      setSrc(getDicebearFallback(profile));
      return;
    }

    setSrc(getProfilePictureFallback(profile, platform));
    setUsedFallback(true);
  };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={handleError}
    />
  );
}
