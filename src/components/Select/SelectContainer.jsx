import React from 'react'
import Select from './index'

export default function SelectContainer() {

  const newsCategory = [
    {
      value: 'Arts & Entertainment',
      label: '예술/문화',
      tags:[]
    },
    {
      value: 'Autos & Vehicles',
      label: '모빌리티',
      tags: []
    },
    {
      value:'Beauty & Fitness',
      label: '뷰티/건강',
      tags: []
    },
    {
      value:'Books & Literature',
      label:'책/공연/전시',
      tags:[]
    },
    {
      value:'Business & Industrial',
      label:'비즈니스',
      tags:[]
    },
    {
      value:'Computers & Electronics',
      label:'IT/전자',
      tags:[]
    },
    {
      value:'Finance',
      label:'금융',
      tags:[]
    },
    {
      value:'Food & Drink',
      label:'음식/맛집',
      tags:[]
    },
    {
      value:'Games',
      label:'게임',
      tags:[]
    },
    {
      value:'Health',
      label:'건강',
      tags:[]
    },
    {
      value:'Hobbies & Leisure',
      label:'취미/레저',
      tags:[]
    },
    {
      value:'Home & Garden',
      label:'홈/가드닝',
      tags:[]
    },
    {
      value:'Internet & Telecom',
      label:'인터넷/통신',
      tags:[]
    },
    {
      value:'Jobs & Education',
      label:'직업/교육',
      tags:[]
    },
    {
      value:'Law & Government',
      label:'정부/법률',
      tags:[]
    },
    {
      value:'News',
      label:'뉴스',
      tags:[]
    },
    {
      value:'Online Communities',
      label:'커뮤니티',
      tags:[]
    },
    {
      value:'People & Society',
      label:'사회 일반',
      tags:[]
    },
    {
      value:'Pets & Animals',
      label:'반려동물',
      tags:[]
    },
    {
      value:'Real Estate',
      label:'부동산',
      tags:[]
    },
    {
      value:'Reference',
      label:'레퍼런스',
      tags:[]
    },
    {
      value:'Science',
      label:'과학 일반',
      tags:[]
    },
    {
      value:'Sensitive Subjects',
      label:'민감한 주제',
      tags:[]
    },
    {
      value:'Shopping',
      label:'쇼핑',
      tags:[]
    },
    {
      value:'Sports',
      label:'스포츠',
      tags:[]
    },
    {
      value:'Travel',
      label:'여행',
      tags:[]
    },
   
  ]

  return (
    <>
    {
      newsCategory.map((select)=>{return <Select key={select.value}>{select.label}</Select>})
    }
    </>
  )
}
