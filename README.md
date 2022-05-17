# About this repo  
- พยายาม commit แยกเรื่องไว้ให้ แต่บางเรื่องอาจจะมีสัก 2-3 commit (เวลามีการ Refractor,พิมพ์ตกไปบางตัว)
- path จะต่างจากที่สอนในห้องนิดหน่อย มี "/api" เพิ่มขึ้นมา
- Controller บางตัวอาจจะเขียนต่างกับในห้องเล็กน้อย รวมถึงชื่อตัวแปร

## Branch : Main
- Sequelize-cli : เรื่อง Model, Association
- Express : ขึ้นโปรเจคใหม่แบ่ง route เป็น user,todo
- Sequelize : เขียน todo controller,user controller
- Bcrypt : ใช้ basedPassword, Compare Password (Register and Login)
- JWT : ส่ง Token ไปเมื่อ login สำเร็จ (Login)
- JWT : ส่ง Token กลับมา Validate
- JWT  : ทำ Authorize middleware && เพิ่ม errorToken 
- JWT : นำ Authorize middleware ไปใช้กับ Todo
- JWT : นำ Authorize middleware ไปใช้กับ userUpdate
- dotENV: ใช้ library ช่วยเก็บค่า environment && เรียกใช้ที่ไฟลร์ต่างๆ
- CODE : เพิ่มโค้ดสำหรับดัก token ที่ถูกสร้างก่อนเปลี่ยน password ให้ใช้งานไม่ได้

## Branch : Passport-JWT
- Passport : ใช้ Passport ทำการ Authenticate แทน Authenticate Middleware ของเดิม
