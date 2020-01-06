import api from '@/util/api';

export default {
       fetData(){
            return api.get('/api/admin/wx')
       },
       edit( p = {} ){
            return api.post('/api/admin/wx/edit', p )
       }
}