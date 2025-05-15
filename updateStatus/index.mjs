import { getUser, updateStatus } from './func.mjs';

export const handler = async (event) => {
  try {
    console.log('handler start');
    const body = JSON.parse(event.body);
    console.log('body', body);

    // 担当者を取得
    const assignee = await getUser();
    console.log('assignee', assignee);

    // ステータスを更新
    console.log('updateStatus exec');
    await updateStatus(
      body.app.id,
      assignee.code,
      body.record.$id.value,
      body.record.$revision.value
    );
  } catch (error) {
    console.log(error);
  }
};
