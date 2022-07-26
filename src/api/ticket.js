import http from '@/utils/require';

//新增ticket接口
export var postTicket = (data)=>{
    
    return http({
        method: 'post',
        url: '/ticket/new',
        data
    });
}

//ticket详情接口
export var getTicketById = (params)=>{
    
    return http({
        method: 'get',
        url: '/ticket/detail',
        params
    });
}

//ticket列表接口
export var getTicket = (params)=>{
    
    return http({
        method: 'get',
        url: '/tickets/list',
        params
    });
}
