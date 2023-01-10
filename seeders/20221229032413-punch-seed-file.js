// 本檔案將生成2022年1月上班日的打卡記錄
'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 2022年1月的上班日
    const workingDay = [
      '2022-01-03',
      '2022-01-04',
      '2022-01-05',
      '2022-01-06',
      '2022-01-07',
      '2022-01-10',
      '2022-01-11',
      '2022-01-12',
      '2022-01-13',
      '2022-01-14',
      '2022-01-17',
      '2022-01-18',
      '2022-01-19',
      '2022-01-20',
      '2022-01-21',
      '2022-01-22',
      '2022-01-24',
      '2022-01-25',
      '2022-01-26',
      '2022-01-27',
      '2022-01-28'
    ]
    // 擷取 Employees 資料表的 id，確保種子檔生成的資料都可對應到存在於 Employees 資料表內的 ID。
    const employees = await queryInterface.sequelize.query(
      'SELECT id FROM Employees;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    // 種子資料中，有一名員工 irregular 的出勤狀況較不規律，例如出勤時間未滿八小時。
    const irregular = []
    irregular.push(employees.pop())
    // 產生規律上下班員工的打卡記錄
    for (const day of workingDay) {
      await queryInterface.bulkInsert(
        'Punches',
        Array.from(employees, (value) => ({
          employee_id: value.id,
          working_day: day,
          working_hours: 8,
          state: '出勤時數已達標準',
          created_at: new Date(`${day} 10:00:00`),
          updated_at: new Date(`${day} 18:01:00`)
        })),
        {}
      )
    }
    // 產生打卡時間較不規律的記錄
    for (const day of workingDay) {
      // 不規則記錄一：當天只打卡一次
      if (day === '2022-01-03' || day === '2022-01-04') {
        await queryInterface.bulkInsert(
          'Punches',
          Array.from(irregular, (value) => ({
            employee_id: value.id,
            working_day: day,
            state: '完成上班打卡',
            working_hours: 0,
            created_at: new Date(`${day} 11:11:11`),
            updated_at: new Date(`${day} 11:11:11`)
          })),
          {}
        )
        continue
        // 不規則記錄二：出勤時間未滿八小時
      } else if (day === '2022-01-05' || day === '2022-01-06') {
        await queryInterface.bulkInsert(
          'Punches',
          Array.from(irregular, (value) => ({
            employee_id: value.id,
            working_day: day,
            state: '警告：出勤時數未達標準',
            working_hours: 1,
            created_at: new Date(`${day} 11:11:11`),
            updated_at: new Date(`${day} 12:12:12`)
          })),
          {}
        )
        continue
      }
      // 如果上班日不符合前述條件，員工 irregular 就和其他員工一樣時間打卡。
      await queryInterface.bulkInsert(
        'Punches',
        Array.from(irregular, (value) => ({
          employee_id: value.id,
          working_day: day,
          state: '出勤時數已達標準',
          working_hours: 8,
          created_at: new Date(`${day} 10:00:00`),
          updated_at: new Date(`${day} 18:01:00`)
        })),
        {}
      )
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Punches', null, {})
  }
}
