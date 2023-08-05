import client from "../../../client";
import bcrypt from "bcrypt";
import { IAccount, IContext } from "../User.interface";
import { protectResolver } from "../User.Utils";
import { awsPhotoDelete, awsPhotoUpload } from "../../shared/shared.util";

export default {
  Mutation: {
    editProfile: protectResolver(
      async (
        _: unknown,
        {
          firstName,
          lastName,
          userName,
          email,
          bio,
          avatar,
          password: newPassword,
        }: IAccount,
        { loggedInUser }: IContext
      ) => {
        let avatarUrl = null;
        if (avatar) {
          avatarUrl = await awsPhotoUpload(avatar, loggedInUser.id, "avatars");
          awsPhotoDelete(loggedInUser.avatar, "avatars");
          // const {
          //   file: { filename, createReadStream },
          // }: any = await avatar;
          // const newFileName = `${
          //   loggedInUser?.userName
          // }-${Date.now()}-${filename}`;
          // console.log(`in resolvers ${filename}`);
          // const readStream = createReadStream();
          // const writeStream = createWriteStream(
          //   process.cwd() + "/uploads/" + newFileName
          // );
          // readStream.pipe(writeStream);
          // avatarUrl = `http://localhost:4000/static/${newFileName}`;
        }
        let uglyPassword = null;
        if (newPassword) {
          uglyPassword = await bcrypt.hash(newPassword, 10);
        }

        const updateUser = await client.user.update({
          where: {
            id: loggedInUser?.id,
          },
          data: {
            firstName,
            lastName,
            userName,
            email,
            bio,
            ...(uglyPassword && { password: uglyPassword }),
            ...(avatar && { avatar: avatarUrl }),
          },
        });
        if (updateUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "업데이트가 불가능합니다",
          };
        }
      }
    ),
  },
};
