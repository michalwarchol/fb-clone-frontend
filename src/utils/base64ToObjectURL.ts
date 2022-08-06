export const base64ToObjectURL = (base64: string): string => {
  if(base64){
    const arrayBufferView = Uint8Array.from(window.atob(base64), c => c.charCodeAt(0));
    const blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
    const objectURL = URL.createObjectURL(blob);
    return objectURL;
  }
  return "";
};