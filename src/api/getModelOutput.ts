type GetModelOutputProps = {
  userId: string;
  appId: string;
  inputText: string;
  modelId: string;
  modelVersionId: string;
};

const allowedCharsRegEx = /[^a-zA-Z0-9 .,]/gm;

export const getModelOutput = ({
  userId,
  appId,
  inputText,
  modelId,
  modelVersionId,
}: GetModelOutputProps): Promise<string | undefined> => {
  const raw = JSON.stringify({
    user_app_id: {
      user_id: userId,
      app_id: appId,
    },
    inputs: [
      {
        data: {
          text: {
            raw: inputText.substring(0, 500),
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + process.env.REACT_APP_PAT,
    },
    body: raw,
  };

  // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
  // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
  // this will default to the latest version_id

  return fetch(
    "https://api.clarifai.com/v2/models/" +
      modelId +
      "/versions/" +
      modelVersionId +
      "/outputs",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      if (result?.outputs[0]?.data?.text?.raw) {
        return result?.outputs[0]?.data?.text?.raw
          ?.replaceAll("\n", "")
          .replaceAll(allowedCharsRegEx, "");
      }
      console.error("Unexpected Error", result?.status?.description);
      return result?.status?.description || "Unexpected Error";
    })
    .catch((error) => {
      console.error("Unexpected Error", error);
      return "Unexpected Error";
    });
};
