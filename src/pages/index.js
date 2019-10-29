import { Button } from 'antd';
import AppLayout from '@/components/app_layout';
 import Shortcut from '@/components/home/shortcut';

import Statistics from '@/components/home/statistics';
import MembershipStatistics from '@/components/home/membership_statistics';
import Todo from '@/components/home/todo';
import Version from '@/components/home/version';

export default function() {
  return (
     <AppLayout style={{ backgroundColor : '#f0f2f5' }}>
           <div className="ell" style={{ borderBottom : '1px solid red', marginBottom : '1%' }}>
                 <Shortcut />
                 <Todo />
                 <Version />
            </div> 

          <div className="ell">
              <Statistics />
              <MembershipStatistics />
          </div>


  
     </AppLayout>
  );
}
