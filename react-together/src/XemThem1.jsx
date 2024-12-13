import React, { useState, useRef, useEffect } from "react";
import "./style.css"; // Import file CSS cho component nếu có

export function XemThem1() {
  const [isExpanded, setIsExpanded] = useState(false); // Trạng thái xem thêm hay không
  const [isContentOverflowing, setIsContentOverflowing] = useState(false); // Trạng thái kiểm tra tràn
  const contentRef = useRef(null); // Dùng để tham chiếu đến phần nội dung

  // Số dòng tối đa khi không mở rộng
  const maxLines = 10;

  // Kiểm tra nếu nội dung bị tràn để hiển thị nút "Xem thêm"
  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        // Lấy chiều cao của một dòng
        const lineHeight = parseFloat(
          window.getComputedStyle(contentRef.current).lineHeight
        );

        // Tính chiều cao tối đa dựa trên số dòng
        const maxHeight = lineHeight * maxLines;

        // Kiểm tra nếu nội dung vượt quá chiều cao tối đa
        setIsContentOverflowing(
          contentRef.current.scrollHeight > maxHeight
        );
      }
      console.log("🚀 ~ XemThem1 ~ isExpanded:", isExpanded);
      console.log("🚀 ~ XemThem1 ~ isContentOverflowing:", isContentOverflowing);
    };

    // Kiểm tra overflow lần đầu khi render
    checkOverflow();

    // Cập nhật lại kiểm tra khi có sự thay đổi kích thước của cửa sổ
    window.addEventListener("resize", checkOverflow);

    // Cleanup khi component unmount
    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [isExpanded]); // Chạy lại khi isExpanded thay đổi

  return (
    <div className="content-wrapper">
      <div
        className="content"
        ref={contentRef}
        style={{
          maxHeight: isExpanded ? "none" : `${maxLines}em`, // Giới hạn chiều cao theo số dòng
          overflow: "hidden",
          lineHeight: "1.5em", // Đặt line-height cho dễ tính toán
        }}
      >
        “Hành Trình của Moana 2” là màn tái hợp của Moana và Maui sau 3 năm, trở
        lại trong chuyến phiêu lưu cùng với những thành viên mới. Theo tiếng gọi
        của tổ tiên, Moana sẽ tham gia cuộc hành trình đến những vùng biển xa
        của tổ tiên, Moana sẽ tham gia cuộc hành trình đến những vùng biển xa
        “Hành Trình của Moana 2” là màn tái hợp của Moana và Maui sau 3 năm, trở
        lại trong chuyến phiêu lưu cùng với những thành viên mới. Theo tiếng gọi
        của tổ tiên, Moana sẽ tham gia cuộc hành trình đến những vùng biển xa
        của tổ tiên, Moana sẽ tham gia cuộc hành trình đến những vùng biển xa
        “Hành Trình của Moana 2” là màn tái hợp của Moana và Maui sau 3 năm, trở
        lại trong chuyến phiêu lưu cùng với những thành viên mới. Theo tiếng gọi
        của tổ tiên, Moana sẽ tham gia cuộc hành trình đến những vùng biển xa
        của tổ tiên, Moana sẽ tham gia cuộc hành trình đến những vùng biển xa
        “Hành Trình của Moana 2” là màn tái hợp của Moana và Maui sau 3 năm, trở
        lại trong chuyến phiêu lưu cùng với những thành viên mới. Theo tiếng gọi
        của tổ tiên, Moana sẽ tham gia cuộc hành trình đến những vùng biển xa
        của tổ tiên, Moana sẽ tham gia cuộc hành trình đến những vùng biển xa
      </div>
      {isContentOverflowing && (
        <button
          className="btn-see-more"
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        >
          {isExpanded ? "Thu gọn" : "Xem thêm"}
        </button>
      )}
    </div>
  );
}

export default XemThem1;