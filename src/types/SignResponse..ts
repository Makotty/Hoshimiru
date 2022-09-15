export type SignResponseTypes = {
  data: {
    result: [
      {
        altitude: string // 高度
        altitudeNum: number // 高度値
        confirmed: string
        content: string // 星座の説明
        direction: string // 方角
        directionNum: number // 方位角
        drowing: string
        eclipticalFlag: string
        enName: string // 英語表記名
        id: string
        jpName: string // 日本語表記名
        origin: string
        ptolemyFlag: string
        roughly: string
        starIcon: string // 星座のアイコン
        starImage: string // 星座の画像
      }
    ]
  }
}
