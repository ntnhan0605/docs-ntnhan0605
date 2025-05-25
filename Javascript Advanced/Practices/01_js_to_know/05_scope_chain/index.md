# <div align="center">Scope Chain</div>

- Scope : tầm vực
- Chain : Chuỗi (Khác với ý nghĩa của `string`)
- Scope được hình thành ở giai đoạn `Creation Phase` phụ thuộc vào vị trí khai báo hàm.
- Trong cùng 1 scope các VEs (Variables Environments) của một đoạn chương trình có thể nhìn thấy và sử dụng thoải mái.
- Các **Scope con** lồng bên trong sẽ được kế thừa lại từ **Scope cha** bên ngoài:
  - **Script Scope** có thể dùng VEs trong Global Script.
  - **Block Scope** có thể dùng VEs trong Script Scope.
  - _Local Scope_ của **Function con** có thể sử dụng VEs nằm trong _Local Scope_ của **Function cha**
