import { useEffect } from 'react';
export default () => {
    useEffect(() => {}, []);

    console.log('仅仅渲染一次');

    return (
        <div className="test-page">  测试权限页面  </div>
    )
}