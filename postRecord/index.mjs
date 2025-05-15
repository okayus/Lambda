import { KintoneRestAPIClient } from '@kintone/rest-api-client';

// 環境変数を定数として定義する
const CONTACT_API_TOKEN = process.env.CONTACT_API_TOKEN;
const SUBDOMAIN = process.env.SUBDOMAIN;
const CONTACT_APP_ID = process.env.CONTACT_APP_ID;

// インスタンス生成
const client = new KintoneRestAPIClient({
  baseUrl: `https://${SUBDOMAIN}.cybozu.com/`,
  auth: {
    apiToken: CONTACT_API_TOKEN,
  },
});

// 問い合わせ内容を kintone に登録する関数
export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    const postData = {
      氏名: {
        value: body.name,
      },
      メールアドレス: {
        value: body.mail,
      },
      問い合わせ内容: {
        value: body.text,
      },
      使用している製品: {
        value: body.productsBox,
      },
    };

    const postForm = await client.record.addRecord({
      app: CONTACT_APP_ID,
      record: postData,
    });
    return {
      statusCode: 200,
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify(postForm),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'エラーが発生しました',
      }),
    };
  }
};
