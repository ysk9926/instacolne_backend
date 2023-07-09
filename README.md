# Instaclone

Instaclone Backend

## Useer

- [ ✔ ] Create Account
- [ ✔ ] See Profile
- [ ✔ ] Login
- [ ✔ ] Edit Profile
- [ ✔ ] Follow User
- [ ✔ ] Unfollow User
- [ ✔ ] Change Avator (Image Upload)

---

## Apollo Server 파일 업로드 이슈 및 해결책

Apollo Server에서 파일 업로드 기능과 관련하여 발생하는 문제점과 그에 대한 해결책에 대해 알아보겠습니다.

1. 버전 호환성 문제:

   - Apollo Server의 강의나 예제는 2021년 이전의 버전을 기준으로 작성되었을 수 있습니다.
   - 최신 버전의 Apollo Server에서는 업로드 기능이 내장되어 있지 않을 수 있습니다.
   - 이 경우, "graphql-upload"와 같은 외부 패키지를 사용하여 업로드 기능을 구현할 수 있습니다.

2. "graphql-upload" 패키지 사용:

   - "graphql-upload" 패키지를 사용하여 파일 업로드를 구현해 보았지만, 다음과 같은 오류가 발생할 수 있습니다: "post body missing, invalid content-type, or json object has no keys."
   - 이는 "graphql-upload" 패키지 내부의 문제로 인한 것일 수 있으며, 해결 방법을 찾기 어렵습니다.

3. "multer" 미들웨어 사용:

   - "multer" 미들웨어를 사용하여 파일 업로드를 시도해 볼 수 있습니다.
   - 그러나 "multer" 설정과 GraphQL에서 사용하는 파일 형식 간에 일치하지 않아 추가적인 코드 작성이 필요할 수 있습니다.

4. "graphql-upload" 패키지와 ESM(ES Modules) 문제:
   - "graphql-upload" 패키지의 최신 버전은 CommonJS(CJS)를 지원하지 않고, ESM(ES Modules)를 사용합니다.
   - TypeScript를 사용하여 프로젝트를 진행하고 있었다면, TypeScript에서 발생하는 문제일 수 있습니다.
   - 이 경우, "tsimportlib" 패키지를 사용하여 동적으로 ES 모듈을 가져올 수 있도록 처리하여 파일 업로드 관련 오류를 해결할 수 있습니다.

이번 문제를 통해 TypeScript의 모듈 관련 문제에 대해 다시 한 번 공부하고, 모듈에 따라 문법이 달라서 오류가 발생할 수 있다는 것을 인지하게 되었습니다.

---

- Done Date 2023.06.26

## Photos

- [ ✔ ] Upload Photo (Parse #)
- [ ✔ ] See Photo
- [ ✔ ] See Hashtag
- [ ✔ ] Search Photos
- [ ✔ ] Edit Photo
- [ ✔ ] Like / Unlike Photo
- [ ✔ ] See Photo Likes
- [ ✔ ] See Feed
- [ ✔ ] See Photo Comments
- [ ✔ ] Delete Photo

## Comments

- [ ✔ ] Comment on Photo
- [ ✔ ] Delete Comment
- [ ✔ ] Edit Comment

## Refactor

- [ ✔ ] Mutation Responses

## Extras

- [ ✔ ] S3 Image Upload
