import { KintoneRestAPIClient } from '@kintone/rest-api-client';

// 環境変数を定数として定義する
const SUBDOMAIN = process.env.SUBDOMAIN;
const CONTACT_API_TOKEN = process.env.CONTACT_API_TOKEN;
const GROUP_CODE = process.env.GROUP_CODE;
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

// インスタンスの生成
const client = new KintoneRestAPIClient({
  baseUrl: `https://${SUBDOMAIN}.cybozu.com`,
  auth: {
    apiToken: CONTACT_API_TOKEN,
  },
});

// ユーザーを取得して、ランダムで一名抽出する関数
export const getUser = async () => {
  try {
    const resp = await fetch(
      `https://${SUBDOMAIN}.cybozu.com/v1/group/users.json?code=${GROUP_CODE}`,
      {
        method: 'GET',
        headers: {
          'X-Cybozu-Authorization': btoa(`${USERNAME}:${PASSWORD}`),
        },
      }
    );
    const data = await resp.json();

    // ランダムで1名選出
    const users = data.users;
    const selectedPerson = users[Math.floor(Math.random() * users.length)];
    return selectedPerson;
  } catch(error) {
    console.log(error);
    throw error;
  }
};

// ステータスを更新する関数
export const updateStatus = async (appId, assignee, id, revision) => {
  try {
    await client.record.updateRecordStatus({
      action: '処理開始',
      app: appId,
      assignee: assignee,
      id: id,
      revision: revision,
    })
  } catch(error) {
    console.log(error);
    throw error;
  }
};
