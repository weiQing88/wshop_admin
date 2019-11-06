import NavLink from 'umi/navlink';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
const routes = [
        { path: '/',  breadcrumb: '首页' },
        { path: '/goods',  breadcrumb: '商品列表'  },
        { path: '/goods/category',  breadcrumb: '商品分类'  },
        { path: '/goods/attrs',  breadcrumb: '商品参数'  },

        { path: '/order',  breadcrumb: '订单列表'  },
        { path: '/order/deliver',  breadcrumb: '发货单列表'  },
        { path: '/order/cancel',  breadcrumb: '退货单列表'  },
        { path: '/order/service',  breadcrumb: '售后单列表'  },

        // { path: '/wx',  breadcrumb: '微信管理'  },
        { path: '/wx/setting',  breadcrumb: '小程序配置'  },

        { path: '/members',  breadcrumb: '用户列表'  },
        { path: '/members/admin',  breadcrumb: '管理员管理'  },
        { path: '/members/roles',  breadcrumb: '角色管理'  },

        { path: '/logs',  breadcrumb: '管理员日志'  },

  ];


  export default withBreadcrumbs( routes )(({ breadcrumbs }) => { 
            return (
                <div className="app-breadcrumbs-wrapper" >
                {  breadcrumbs.map(( breadcrumb, index) => (
                    <span className="app-breadcrumbs-item" key={breadcrumb.key}>
                    <NavLink to={ breadcrumb.match.url }>
                      { breadcrumb.breadcrumb.props.children  } 
                    </NavLink>
                    {(index < breadcrumbs.length - 1) && <i> / </i>}
                    </span>
                ))}
                </div>
            )
    }
  );