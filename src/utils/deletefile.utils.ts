import fileRemover from "./fileremove.util";

const deleteFile = async (oldImgURL: string, avatar: boolean) => {
  const subpath = avatar ? "avatar" : "diagram";
  const imgURL = oldImgURL.split("/");
  const lastIdx = imgURL.length - 1;
  const filepath = imgURL[lastIdx];
  const isRemoved = await fileRemover({filepath, subpath});
  if (isRemoved) return true;
};

export default deleteFile;
