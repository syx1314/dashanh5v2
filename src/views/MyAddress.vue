<template>
    <div class="">
        <title-view title="我的地址"/>
        <van-address-list
                v-model="chosenAddressId"
                :list="list"
                default-tag-text="默认"
                @add="onAdd"
                @edit="onEdit"
        />
    </div>
</template>

<script>
    import local from '../utils/storage'
    import titleView from '../components/CommonTitle'

    export default {
        name: 'MyAddress',
        data() {
            return {
                address: '',
                uname: '',
                phone: '',
                province: '',
                address_info: '',
                flag: '',
                ads: '',
                list: [
                    {
                        id: '1',
                        name: '张三',
                        tel: '13000000000',
                        address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
                        isDefault: true,
                    },
                    {
                        id: '2',
                        name: '李四',
                        tel: '1310000000',
                        address: '浙江省杭州市拱墅区莫干山路 50 号',
                    },
                ],
            }
        },
        components: {
            titleView
        },
        created() {
            const user = local.getUser()
            if (user) {
                // 说明此时登陆着
                console.dir(user)
            }
            this.getAddress(9)
        },
        methods: {
            onAdd() {
                this.$router.push({name: 'AddressEdit'})
            },
            getAddress($userId) {
                this.$fetch('/Customer/getAddress?userId='+$userId,'').then((res) => {
                    console.log(res)
                    if (res['errno'] === 0 && res['data']) {
                        let data = res['data'];
                        for (let i = 0; i < data.length; i++) {
                             let temp ={
                                 'id': data['id'],
                                 'name': data['uname'],
                                 'tel': data['phone'],
                                 'address': data['province'].data['city'].data['county'].data['town'].data['address_detail'],
                                 'isDefault': data['"deafult'] != 0,
                             }
                        }
                    }
                })
            }
        },
        setup() {
            const chosenAddressId = ref('1');
            const list = [
                {
                    id: '1',
                    name: '张三',
                    tel: '13000000000',
                    address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
                    isDefault: true,
                },
                {
                    id: '2',
                    name: '李四',
                    tel: '1310000000',
                    address: '浙江省杭州市拱墅区莫干山路 50 号',
                },
            ];
            const disabledList = [
                {
                    id: '3',
                    name: '王五',
                    tel: '1320000000',
                    address: '浙江省杭州市滨江区江南大道 15 号',
                },
            ];

            const onAdd = () => Toast('新增地址');
            const onEdit = (item, index) => Toast('编辑地址:' + index);
        }
        }
</script>

<style lang="less" scoped>
  .title {
    height: 40px;
    line-height: 40px;
    color: white;
    background-color: #317ee7;
    margin-bottom: 10px;
    text-align: center;
  }

  .card {
    background-color: white;
    border-radius: 8px;
    padding: 10px;
    margin: 10px 10px;

  }
  .van-radio__icon {
    display: none !important;
  }

</style>
