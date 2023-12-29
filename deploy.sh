#!/bin/bash

cd $(dirname $0)

# Load .env if exists.
if [ -f .env ]; then
  # .envファイルを読み込んで環境変数にエクスポート
  source .env
  echo ".env file loaded."
fi

# Check Required Environment Variables

required() {
  if [ -z "${!1}" ]; then
    echo "Error: Environment variable $1 is not set."
    exit 1
  fi
}

required "KEY_CONTENTS"
required "GC_DEPLOY_NAME"
required "GC_PROJECT_NAME"
required "GC_REGION"
required "GC_PLATFORM"

# Login

TMP_FILENAME=.tmp.iam.gserviceaccount.com.json
echo -n $KEY_CONTENTS > $TMP_FILENAME
gcloud auth activate-service-account --key-file=$TMP_FILENAME
rm -rf $TMP_FILENAME

# Deploy

cd src
gcloud run deploy $GC_DEPLOY_NAME \
  --project $GC_PROJECT_NAME \
  --region $GC_REGION \
  --platform $GC_PLATFORM \
  --source .
