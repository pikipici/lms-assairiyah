import { User } from "next-auth";
import { User as DataUser } from "@prisma/client";
import { FC } from "react";
import MenuAdminPopover from "@/components/item/MenuAdminPopover";
import MenuTeacherPopover from "@/components/item/MenuTeacherPopover";
import MenuStudentPopover from "@/components/item/MenuStudentPopover";

interface MenuNavigatorProps {
  user: Pick<User, "id" | "name" | "email" | "image">;
  initialData: DataUser | null;
}

const MenuNavigator: FC<MenuNavigatorProps> = ({ user, initialData }) => {
  const roleMenu =
    initialData?.role === "ADMIN" ? (
      <MenuAdminPopover />
    ) : initialData?.role === "STUDENT" ? (
      <MenuStudentPopover studentId={user.id} />
    ) : initialData?.role === "TEACHER" ? (
      <MenuTeacherPopover />
    ) : (
      <></>
    );

  return <>{roleMenu}</>;
};

export default MenuNavigator;
