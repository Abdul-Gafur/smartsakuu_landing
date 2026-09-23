"use client";

import type { ReactNode } from "react";

import type { RoleId } from "../../constants";
import { useRoleNavigation } from "./role-context";

type SelectRoleLinkProps = {
  role: RoleId;
  className?: string;
  children: ReactNode;
};

/** Jumps to the roles section with the given role's tab selected. */
export function SelectRoleLink({
  role,
  className,
  children,
}: SelectRoleLinkProps) {
  const { navigate } = useRoleNavigation();

  return (
    <a
      className={className}
      href="#roles"
      onClick={(event) => {
        if (navigate(role)) event.preventDefault();
      }}
    >
      {children}
    </a>
  );
}
