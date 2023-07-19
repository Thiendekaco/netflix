import { addCollectionAndDocuments } from "../utils/firebase/firebase.util"


const introductionArray = [
    {
        title: 'Thưởng thức trên TV của bạn.',
        description: 'Xem trên TV thông minh, Playstation, Xbox, Chromecast, Apple TV, đầu phát Blu-ray và nhiều thiết bị khác.',
        pictures : ["https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png"],
        video: "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v"
    },
    {
        title: 'Tải xuống nội dung để xem ngoại tuyến.',
        description: 'Lưu lại những nội dung yêu thích một cách dễ dàng và luôn có thứ để xem.',
        pictures : 
                ["https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png",
                    "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/boxshot.png"
                ],
        video: "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/download-icon.gif"
    },
    {
        title: 'Xem ở mọi nơi.',
        description: 'Phát trực tuyến không giới hạn phim và chương trình truyền hình trên điện thoại, máy tính bảng, máy tính xách tay và TV.',
        pictures : ["https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg"],
        video: "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices-vn.m4v"
    },
    {
        title: 'Tạo hồ sơ cho trẻ em.',
        description: 'Đưa các em vào những cuộc phiêu lưu với nhân vật được yêu thích trong một không gian riêng.Tính năng này đi kèm miễn phí với tư cách thành viên của bạn.',
        pictures : ["https://occ-0-325-64.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABbtRHxTEgmwtFXR4vBnwSO9UzWSascscH0PRpGcXYVkyVez31FciwrQ4bmD41KIrsypJG4Bf54yOJL82SDLL54SGCIdZov0ySklR.png?r=df6"],
        video: ""
    },
]
const frerquentlyQuestion = [
    {
        title: "Netflix là gì?",
        ans:"Netflix là dịch vụ phát trực tuyến mang đến đa dạng các loại chương trình truyền hình, phim, anime, phim tài liệu đoạt giải thưởng và nhiều nội dung khác trên hàng nghìn thiết bị có kết nối Internet.Bạn có thể xem bao nhiêu tùy thích, bất cứ lúc nào bạn muốn mà không gặp phải một quảng cáo nào - tất cả chỉ với một mức giá thấp hàng tháng. Luôn có những nội dung mới để bạn khám phá và những chương trình truyền hình, phim mới được bổ sung mỗi tuần!"
    },
    {
        title: "Tôi phải trả bao nhiêu tiền để xem Netflix?",
        ans: "Xem Netflix trên điện thoại thông minh, máy tính bảng, TV thông minh, máy tính xách tay hoặc thiết bị phát trực tuyến, chỉ với một khoản phí cố định hàng tháng. Các gói dịch vụ với mức giá từ 70.000 ₫ đến 260.000 ₫ mỗi tháng. Không phụ phí, không hợp đồng."
    },
    {
        title: "Tôi có thể xem ở đâu?",
        ans: "Xem mọi lúc, mọi nơi. Đăng nhập bằng tài khoản Netflix của bạn để xem ngay trên trang web netflix.com từ máy tính cá nhân, hoặc trên bất kỳ thiết bị nào có kết nối Internet và có cài đặt ứng dụng Netflix, bao gồm TV thông minh, điện thoại thông minh, máy tính bảng, thiết bị phát đa phương tiện trực tuyến và máy chơi game. Bạn cũng có thể tải xuống các chương trình yêu thích bằng ứng dụng trên iOS, Android hoặc Windows 10. Vào phần nội dung đã tải xuống để xem trong khi di chuyển và khi không có kết nối Internet. Mang Netflix theo bạn đến mọi nơi."
    },
    {
        title: " Làm thế nào để hủy?",
        ans: "Netflix rất linh hoạt. Không có hợp đồng phiền toái, không ràng buộc. Bạn có thể dễ dàng hủy tài khoản trực tuyến chỉ trong hai cú nhấp chuột. Không mất phí hủy - bạn có thể bắt đầu hoặc ngừng tài khoản bất cứ lúc nào."
    },
    {
        title : "Tôi có thể xem gì trên Netflix ?",
        ans: "Netflix có một thư viện phong phú gồm các phim truyện, phim tài liệu, chương trình truyền hình, anime, tác phẩm giành giải thưởng của Netflix và nhiều nội dung khác. Xem không giới hạn bất cứ lúc nào bạn muốn."
    },
    {
        title: "Netflix có phù hợp cho trẻ em không?",
        ans:"Trải nghiệm Netflix Trẻ em có sẵn trong gói dịch vụ của bạn, trao cho phụ huynh quyền kiểm soát trong khi các em có thể thưởng thức các bộ phim và chương trình phù hợp cho gia đình tại không gian riêng. Hồ sơ Trẻ em đi kèm tính năng kiểm soát của cha mẹ (được bảo vệ bằng mã PIN), cho phép bạn giới hạn độ tuổi cho nội dung con mình được phép xem, cũng như chặn những phim hoặc chương trình mà bạn không muốn các em nhìn thấy."
    },
]
const footerData = [
    {
        title: "Bạn có câu hỏi? Liên hệ với chúng tôi.",
        href: "https://help.netflix.com/vi/contactus"

    },
    {
        title: "Câu hỏi thường gặp",
        href: "https://help.netflix.com/vi/node/412"

    },
    {
        title: "Trung tâm đa phương tiện",
        href: "https://media.netflix.com/en/"

    },
    {
        title: "Các cách xem",
        href: "https://devices.netflix.com/en/"

    },
    {
        title: "Tùy chọn cookie",
        href: ""

    },
    {
        title: "Kiểm tra tốc độ",
        href: "https://fast.com/"

    },
    {
        title: "Trung tâm trợ giúp",
        href: "https://help.netflix.com/vi/"

    },
    {
        title: "Quan hệ với nhà đầu tư",
        href: "https://ir.netflix.net/ir-overview/profile/default.aspx"

    },
    {
        title: "Điều khoản sử dụng",
        href: "https://help.netflix.com/legal/termsofuse"

    },
    {
        title: "Thông tin doanh nghiệp",
        href: "https://help.netflix.com/legal/corpinfo"

    },
    {
        title: "Thông báo pháp lý",
        href: "https://help.netflix.com/legal/notices"

    },
    {
        title: "Tài khoản",
        href: "https://www.netflix.com/vn/login?nextpage=https%3A%2F%2Fwww.netflix.com%2Fyouraccount"

    },
    {
        title: "Việc làm",
        href: "https://jobs.netflix.com/"

    },
    {
        title: "Quyền riêng tư",
        href: "https://help.netflix.com/legal/privacy"

    },
    {
        title: "Liên hệ với chúng tôi",
        href: "https://help.netflix.com/vi/contactus"

    },
    
    {
        title: "Chỉ có trên Netflix",
        href: "https://www.netflix.com/vn/browse/genre/839338"
    }


]

const homeData = async() =>{
   await addCollectionAndDocuments("Footer", footerData);
}

export default homeData;