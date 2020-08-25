function Locationpbf(unbyte){
    var locationpbf = new proto.Location();
    /*
        fixed64 timestamp = 1;  // 定位消息的时间戳，单位0.001秒，Unix Epoch Time, UTC时区
        double longitude = 2; // 经度
        double latitude = 3;  //纬度
        float altitude = 4;  //高度，相对参考地面的高度
        string floor = 5;  //楼层名称
        float accuracy = 6;  //定位精度，单位：米
        float battery = 7; //定位卡电量：[0~1]，1表示100%，0.5表示50%
        bool sos = 8; //是否求救/手动报警
        bool motion = 9; //是否运动
        float speed = 10; //GPS测量到的运动速度，蓝牙定位此数据为0
        float heading = 11; //GPS测量到的运行方向，蓝牙定位此数据为0
        float temperature = 12; //温度，单位：℃
        string mode = 13; // 定位模式: 蓝牙=BLE，卫星=GNSS 
    */

    locationpbf.setTimestamp(unbyte.getTimestamp());

    return locationpbf;
}

function caluateManCoordinate(){
    
}