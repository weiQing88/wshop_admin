import React, { Component } from 'react';
import { Card,Button, Empty, Pagination, Spin } from 'antd';
import { connect } from 'dva';
import util from '@/util';

class AttrSelector extends Component {
         handleClick( arg ){
               if( arg.type == 'l' ){
                        let dataSource = util.deepCopyArray( this.props.dataSource || [] );
                            dataSource.forEach( item => {
                                    if( item.attr_id == arg.item.attr_id )  item.selected = !item.selected;
                            });
                         this.props.dispatch({
                                type  : 'attrselector/setState',
                                payload :  {
                                    key : 'dataSource',
                                    value : dataSource
                                 }
                        });
                 }else if( arg.type == 'r' ){
                       let selectedKeys = util.deepCopyArray( this.props.selectedKeys );
                           selectedKeys.forEach( item => {
                                if( item.attr_id == arg.item.attr_id )  item.selected = !item.selected;
                            });
                            this.props.dispatch({
                                    type  : 'attrselector/setState',
                                    payload :  {
                                        key : 'selectedKeys',
                                        value : selectedKeys
                                    }
                            });
                
                   }
         }


         handleTransfer( dir ){
                if( dir == 'l' ){
                    let selectedKeys = util.deepCopyArray( this.props.selectedKeys );
                    for( let i = selectedKeys.length - 1; i > -1; i--){
                          if( selectedKeys[i].selected ) selectedKeys.splice( i, 1 );
                    }
                     this.triggerChange( selectedKeys );
                     this.props.dispatch({
                        type  : 'attrselector/setState',
                        payload :  {
                            key : 'selectedKeys',
                            value : selectedKeys
                        }
                    })
               
                }else if( dir == 'r' ){
                  let dataSource = util.deepCopyArray( this.props.dataSource || [] );
                  let selectedKeys = [];
                     dataSource.forEach( item => {
                            if( item.selected ){
                                 let key = util.deepCopy( item );
                                     key.selected = false;
                                selectedKeys.push( key );
                            }
                    });

                    let ids = this.props.selectedKeys.map( item => item.attr_id );
                        for( let i = selectedKeys.length - 1; i > -1; i--){
                             if( ids.indexOf( selectedKeys[i].attr_id ) > -1 ) selectedKeys.splice( i, 1 );
                        }
                        selectedKeys = this.props.selectedKeys.concat( selectedKeys );
                        this.triggerChange( selectedKeys );  
                        this.props.dispatch({
                            type  : 'attrselector/setState',
                            payload :  {
                                key : 'selectedKeys',
                                value : selectedKeys
                            }
                        })
                }
         }



         triggerChange = changedValue => {
            // Should provide an event to pass value to Form.
            const { onChange = () => {} } = this.props;
               onChange( changedValue );
          };



    onTableChange = (page, pageSize) => {
           if( this.props.loading ) return;
            this.props.dispatch({
                type : 'attrselector/fetAttrs',
                payload : { page, limit : pageSize }
             });
    }



      render(){
           let { page = 1, total = 0, loading, dataSource = [], selectedKeys = []  } = this.props;
            return (
                <div className="attr-selector-wrapper clearFloat">
                <Spin spinning={ loading } className="clearFloat">
                   <span className="col4">
                    <Card title="商品属性" style={{ width: '100%' }}>
                         {
                            dataSource.map(( item,index ) => (
                                <p  className={[ 'attr-selector-item ell',item.selected ? 'selected' : '' ].join(' ')} 
                                   key={index} 
                                   onClick={ this.handleClick.bind(this, { type : 'l', item }) }>{ item.attr_name }  </p>
                             ))
                         }

                         {
                            dataSource.length <= 0 ? (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />) : null
                         }

                    </Card>
                    <Pagination 
                        onChange={ this.onTableChange }
                        current={ Number(page) } 
                        pageSize={ 10 }
                        style={{ marginTop : 5 }}
                        size="small" total={ total } />
                </span>
                <span className="col2">
                    <Button onClick={ this.handleTransfer.bind(this, 'l') } size="small" icon="arrow-left"/>
                    <Button onClick={ this.handleTransfer.bind(this, 'r') }  size="small" icon="arrow-right"/>
                </span>
                <span className="col4">
                    <Card title="已选属性" style={{ width: '100%' }}>
                          {
                            selectedKeys.map(( item,index ) => (
                                <p  className={['attr-selector-item ell',item.selected ? 'selected' : '' ].join(' ')} 
                                 key={index} onClick={ this.handleClick.bind(this,{ type : 'r', item }) }>{ item.attr_name }</p>
                             ))
                          }
                         {
                            selectedKeys.length <= 0 ? (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />) : null
                         }
                        </Card>
                  </span>
                </Spin>
                </div>
            )
      }
}


function mapStateToProps(state) {
    const {limit, total, page, selectedKeys, dataSource } = state.attrselector;
     return {
           page,
           limit,
           total,
           dataSource,
           selectedKeys,
           loading: state.loading.models.attrselector,
     };
   }
   

  
export  default connect( mapStateToProps )( AttrSelector );