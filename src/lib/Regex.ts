export const URLReg =  /^(ftp|http|https):\/\/[^\s:.,-_?=&;]+\.[a-zA-Z]{2,6}(\/[.\w-]*)?\??([^\s]*)$/;
// export const URLReg = /^(ftp|http|https):\/\/[^ "]+$/;

export const EmailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const PasswordReg =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$^&*()_-]).{8,18}$/;

export const ImgReg = /\.(jpg|jpeg|png|gif|webp)$/i;