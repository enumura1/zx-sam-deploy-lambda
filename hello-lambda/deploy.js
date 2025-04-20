import { $, fs } from 'zx';

// スタック名を定義
const stackName = `hello-python-lambda`;

console.log(`Lambda関数のデプロイを開始します...`);

try {
  // SAMビルド
  console.log('SAMアプリケーションをビルドしています...');
  await $`sam build`;
  
  // SAMデプロイ
  console.log(`CloudFormationスタックにデプロイしています...`);
  await $`sam deploy --stack-name ${stackName} --capabilities CAPABILITY_IAM --no-confirm-changeset`;
  
  console.log('デプロイが完了しました！');
  
  // Lambda関数のARNを取得して表示
  console.log('Lambda関数の情報:');
  const outputs = await $`aws cloudformation describe-stacks --stack-name ${stackName} --query "Stacks[0].Outputs[?OutputKey=='HelloPythonFunction'].OutputValue" --output text`;
  
  console.log(`Lambda関数のARN: ${outputs}`);
  console.log('AWSマネジメントコンソールからLambda関数の詳細を確認できます。');
  
} catch (error) {
  console.error('デプロイ中にエラーが発生しました:', error.message);
  process.exit(1);
}
