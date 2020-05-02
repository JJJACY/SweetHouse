const knex = require('./knex');


class	Base {
	constructor(props){
		this.table = props
	}
	//全部数据
	all() {
		return knex(this.table).select()
  }
  //返回ID
  return(params){
    return knex(this.table).returning('id').insert(params);
  }
  //增加
	insert(params){
		return knex(this.table).insert(params)
  }
  //删除
	delete(id){
		return knex(this.table).where('id','=', id).del();
	}
  //修改用户
	update(id,params){
		return knex(this.table).where('id' ,'=',id).update(params);
	}
  //查找单个
	single(id){
	  return knex(this.table).where('id','=',id);
  }
  //查找参数
  where(params){
    return knex(this.table).where(params);
  }
  //仔细查找
  whereIn(key,arr){
    return knex(this.table).whereIn(key ,arr)
  }
  //反向仔细查找
  whereNotIn(key,arr){
    return knex(this.table).whereNotIn(key, arr)
  }

  //数据分页
	pagination (pageSize = 20, currentPage = 1, params={}, dateFilter={}) {
		let offset = (currentPage - 1) * pageSize;
		if(dateFilter.column) {
      console.log(321)
		  return knex(this.table)
			.where(params)
			.offset(offset)
			.limit(pageSize)
			.whereBetween(dateFilter.column,[`${dateFilter.startAt} 00:00`, `${dateFilter.endAt} 23:59`])
			.select()
	
		}else{
      console.log(123,params,offset,pageSize)
		  return knex(this.table)
			.where(params)
			.offset(offset)
			.limit(pageSize)
			.select()
		}
	}
}

module.exports = Base;