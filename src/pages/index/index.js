import { connect } from 'dva';
import AppLayout from '@/components/app_layout';

import Shortcut from './components/shortcut';
import Statistics from './components/statistics';
import MembershipStatistics from './components/membership_statistics';
import Todo from './components/todo';
import Version from './components/version';


const Home =  function({ dispatch, list, loading, total, page }) {

  /**
   调用方法示例
   let handleTest = function(id) {
      dispatch({
        type: 'homepage/test',
        payload: id,
      });
    }
   */
  
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


function mapStateToProps(state) {
  const { list, total, page } = state.users;
  return {
    list,
    total,
    page,
    loading: state.loading.models.users,
  };
}

export default connect(mapStateToProps)(Home);