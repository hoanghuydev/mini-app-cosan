import { useAtomValue } from "jotai";
import {
  UIMatch,
  useLocation,
  useMatches,
  useNavigate,
} from "react-router-dom";
import { categoriesStateUpwrapped } from "@/state";
import { BackIcon } from "./vectors";
import { useMemo } from "react";
import { useRouteHandle } from "@/hooks";
import { BE_URL, ASSETS_URL } from "@/constants";

export default function Header() {
  const categories = useAtomValue(categoriesStateUpwrapped);
  const navigate = useNavigate();
  const location = useLocation();
  const [handle, match] = useRouteHandle();

  const title = useMemo(() => {
    if (handle) {
      if (typeof handle.title === "function") {
        return handle.title({ categories, params: match.params });
      } else {
        return handle.title;
      }
    }
  }, [handle, categories]);

  const showBack = location.key !== "default" && handle?.back !== false;

  if (handle?.logo) {
    return (
      <div className="h-14 w-full flex items-center px-4 py-2">
        <img src="https://cosan.vn/storage/2023/09/logo-cosan.png" className="max-h-full flex-none" alt="OSACI Logo" />
      </div>
    );
  }

  return (
    <div className="h-12 w-full flex items-center pl-2 pr-[106px] py-2 space-x-1">
      {showBack && (
        <div className="p-2 cursor-pointer" onClick={() => navigate(-1)}>
          <BackIcon />
        </div>
      )}
      <div className="text-xl font-medium truncate">{title}</div>
    </div>
  );
}
