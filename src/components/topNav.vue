<template>
    <div class="topNav">
        <div
        class="item-tab"
        :class="{ active:isActive === index }"
        v-for="(item, index) in tabList"
        :key="index"
        @click="handleClick(index)">
            <img :src="item.imgUrl" alt="">
            <div class="category">{{ item.title }}</div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: 0,
      tabList: [
        {
          imgUrl: 'https://cdn.pixabay.com/photo/2010/12/13/10/05/berries-2277__340.jpg',
          title: '时令水果',
        },
        {
          imgUrl: 'https://media.istockphoto.com/photos/glasses-of-wine-and-cheese-assortment-or-various-type-of-cheese-wine-picture-id1196065656?b=1&k=6&m=1196065656&s=170667a&w=0&h=nXQM23fDy275-NoT3jjd4hJbSnLFBNP-p9s7T2Ssfzw=',
          title: '酒水冲调',
        },
        {
          imgUrl: 'https://media.istockphoto.com/photos/various-fresh-dairy-products-picture-id544807136?b=1&k=6&m=544807136&s=170667a&w=0&h=5GPGxPqh_A4WCO6B9D2G4BnWbJNYLZhGmVbkGxOVo3s=',
          title: '安心乳品',
        },
        {
          imgUrl: 'https://cdn.pixabay.com/photo/2017/10/17/15/15/knabberzeug-2860948__340.jpg',
          title: '休闲零食',
        },
        {
          imgUrl: 'https://cdn.pixabay.com/photo/2017/09/19/20/15/egg-2766454__340.jpg',
          title: '肉蛋食材',
        },
        {
          imgUrl: 'https://cdn.pixabay.com/photo/2015/05/30/01/18/vegetables-790022__340.jpg',
          title: '新鲜蔬菜',
        },
        {
          imgUrl: 'https://cdn.pixabay.com/photo/2016/11/13/21/49/sauerkraut-1822155__340.jpg',
          title: '熟食餐饮',
        },
        {
          imgUrl: 'https://cdn.pixabay.com/photo/2019/01/11/07/30/japan-3926602__340.jpg',
          title: '海鲜水产',
        },
      ],
    };
  },
  methods: {
    handleClick(index) {
      this.isActive = index;
      console.log(index);
    },
  },
};
</script>
<style scoped lang='less'>
.topNav{
    width: 375px;
    overflow-x:auto;
    display: flex;
    &::-webkit-scrollbar{
        width: 0;
    }
    .item-tab{
        width: 50px;
        height: 70px;
        margin: 10px 7px 5px;
        img{
            width: 45px;
            height: 45px;
            border-radius: 50%;
            border: 2px solid transparent;
        }
        .category{
            border-radius: 30px;
        }
    }
    .active{
        img{
            border: 2px solid #d13193;
        }
        .category{
            font-weight: bold;
            color: #fff;
            background-color: #d13193;
            border-radius: 30px;
        }
    }
}
</style>
