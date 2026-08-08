import Swal, { SweetAlertIcon } from "sweetalert2";

interface AlertOptions {
  title: string;
  text?: string;
  icon?: SweetAlertIcon;
  confirmButtonText?: string;
  confirmButtonColor?: string;
  timer?: number;
  showConfirmButton?: boolean;
}

interface ConfirmOptions {
  title: string;
  text?: string;
  icon?: SweetAlertIcon;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
}

interface ToastOptions {
  title: string;
  icon?: SweetAlertIcon;
  timer?: number;
}

export function showAlert(options: AlertOptions): Promise<any>;
export function showAlert(title: string, text?: string, icon?: SweetAlertIcon, confirmButtonColor?: string, confirmButtonText?: string): Promise<any>;
export function showAlert(
  optionsOrTitle: AlertOptions | string,
  text = "",
  icon: SweetAlertIcon = "info",
  confirmButtonColor = "#f59e0b",
  confirmButtonText = "باشه"
) {
  if (typeof optionsOrTitle === "string") {
    return Swal.fire({
      title: optionsOrTitle,
      text,
      icon,
      confirmButtonText,
      confirmButtonColor,
      background: "#09090b",
      color: "#ffffff",
      customClass: {
        popup: "border border-amber-500/30 rounded-2xl shadow-2xl shadow-amber-500/10 font-danaMed",
        title: "font-morabbaReg text-amber-400 font-bold",
        confirmButton: "bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold px-5 py-2.5 rounded-xl text-xs border-0",
      },
    });
  }

  const {
    title,
    text: optText = "",
    icon: optIcon = "info",
    confirmButtonText: optConfirmButtonText = "باشه",
    confirmButtonColor: optConfirmButtonColor = "#f59e0b",
    timer,
    showConfirmButton = true,
  } = optionsOrTitle;

  return Swal.fire({
    title,
    text: optText,
    icon: optIcon,
    confirmButtonText: optConfirmButtonText,
    confirmButtonColor: optConfirmButtonColor,
    timer,
    showConfirmButton,
    background: "#09090b",
    color: "#ffffff",
    customClass: {
      popup: "border border-amber-500/30 rounded-2xl shadow-2xl shadow-amber-500/10 font-danaMed",
      title: "font-morabbaReg text-amber-400 font-bold",
      confirmButton: "bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold px-5 py-2.5 rounded-xl text-xs border-0",
    },
  });
}

export function showConfirm(options: ConfirmOptions): Promise<boolean>;
export function showConfirm(title: string, text?: string, confirmButtonText?: string, icon?: SweetAlertIcon, confirmButtonColor?: string, cancelButtonColor?: string, cancelButtonText?: string): Promise<boolean>;
export async function showConfirm(
  optionsOrTitle: ConfirmOptions | string,
  text = "",
  confirmButtonText = "بله",
  icon: SweetAlertIcon = "warning",
  confirmButtonColor = "#f59e0b",
  cancelButtonColor = "#262626",
  cancelButtonText = "انصراف"
) {
  if (typeof optionsOrTitle === "string") {
    const result = await Swal.fire({
      title: optionsOrTitle,
      text,
      icon,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
      confirmButtonColor,
      cancelButtonColor,
      background: "#09090b",
      color: "#ffffff",
      customClass: {
        popup: "border border-amber-500/30 rounded-2xl shadow-2xl shadow-amber-500/10 font-danaMed",
        title: "font-morabbaReg text-amber-400 font-bold",
        confirmButton: "bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold px-5 py-2.5 rounded-xl text-xs border-0",
        cancelButton: "bg-neutral-800 hover:bg-neutral-700 text-white font-medium px-5 py-2.5 rounded-xl text-xs border border-white/10",
      },
    });
    return result.isConfirmed;
  }

  const {
    title,
    text: optText = "",
    icon: optIcon = "warning",
    confirmButtonText: optConfirmButtonText = "بله",
    cancelButtonText: optCancelButtonText = "انصراف",
    confirmButtonColor: optConfirmButtonColor = "#f59e0b",
    cancelButtonColor: optCancelButtonColor = "#262626",
  } = optionsOrTitle;

  const result = await Swal.fire({
    title,
    text: optText,
    icon: optIcon,
    showCancelButton: true,
    confirmButtonText: optConfirmButtonText,
    cancelButtonText: optCancelButtonText,
    confirmButtonColor: optConfirmButtonColor,
    cancelButtonColor: optCancelButtonColor,
    background: "#09090b",
    color: "#ffffff",
    customClass: {
      popup: "border border-amber-500/30 rounded-2xl shadow-2xl shadow-amber-500/10 font-danaMed",
      title: "font-morabbaReg text-amber-400 font-bold",
      confirmButton: "bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold px-5 py-2.5 rounded-xl text-xs border-0",
      cancelButton: "bg-neutral-800 hover:bg-neutral-700 text-white font-medium px-5 py-2.5 rounded-xl text-xs border border-white/10",
    },
  });
  return result.isConfirmed;
}

export const showToast = ({
  title,
  icon = "success",
  timer = 1500,
}: ToastOptions) => {
  return Swal.fire({
    title,
    icon,
    timer,
    showConfirmButton: false,
    toast: true,
    position: "top-end",
    background: "#09090b",
    color: "#ffffff",
    customClass: {
      popup: "border border-amber-500/30 rounded-xl shadow-xl font-danaMed",
      title: "text-amber-400 font-semibold",
    },
  });
};
