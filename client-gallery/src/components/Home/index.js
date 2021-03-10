import React, {useEffect, useState, useRef} from 'react'
import {config as configProj} from '../../config';
import {getAlbumsArrObj} from '../helpers/await_all';
import styled from 'styled-components';
import FadeIn from 'react-fade-in';
import {getAlbumPreview} from '../helpers/album_metadata';
import Container from 'react-bootstrap/Container'
import Skeleton from 'react-loading-skeleton';
import { useTransition, animated, config } from 'react-spring'
import logo from '../../assets/images/iitt_w.png'
import logo_i from '../../assets/images/logo.png'

const useShowcase = 10;

const available = [
  { id: 0, url: "https://lh3.googleusercontent.com/O9KVd8fYqGqrGXNlk9PY3GVEOLWSJuddwxWwG2TZicEQUN92LRU3vT1sEB-mJ0aaPItZL6RTmyAOrixOTqCmXVV7d7UR5QpcO-C5E0l3xH2EXNaSIY9P2kUYESEPOVGRH_L0k6Nc0Q=w3840"},
  { id: 1, url: "https://lh3.googleusercontent.com/JntM1HNV85WtqVnOmO6VYQX3FR4lgh_9rMBqWZUPz3ENLCDvejptTBX3YRxmwIbLvzxDg-coKKCvvwpM2hrQ4HsUV9njmG5tXberWa5qEs5wra_C8E0bi8D28WsaVHHZ1D4h6hyiyA=w3840"},
  { id: 2, url: "https://lh3.googleusercontent.com/Vv9fEBY2i9H9h7cweWU2M6aH58q6Mh-zukM7y1efliPfbnjjiJToDqdfLxmkKXkU6shaSfVV85vHeVtQ1gsmNe2juXAsUSBHdK2NB695W0sjnZqJ8M1v7vnyEkXHWJtOzDHY2zVUew=w3840"},
  { id: 3, url: "https://lh3.googleusercontent.com/WMpIrvqfuy1V1HSxToEJT6rq5gNrMDyCRKFc-OQO3ro7oRHv9mu4qsGxhGmzslRvmgA0odIADfIB3GLR_L6kKuxOCy7c605gs8jfsxRlhkgOB_5tbWTm_EBEAPv_46zrb8VLAb0j5w=w3840"},
  { id: 4, url: "https://lh3.googleusercontent.com/Z41OUjt2aMzM9utl953lNFhp1oAI2_aT6i3Efs-pxzcHiHeXv4JIk6Dw8tislRgCeE5aTPRfZ0z_TDmjNbWz4BZpBuWNZHBwO4F2rEq-lVm9yw80odiF51oeOFnRgAPDqeN5X3FUCw=w3840"},
  { id: 5, url: "https://lh3.googleusercontent.com/zNITo1yfx6F0F7B1F_FA1DWE0gD7Uy6ribpxK1assaUqH_sTDwGyp48YoZxYmumpmJmR_V-zAPnrZkzxEBYdT-KSxBd_96wSVNugTMYEQuFltyY7rFuEqI5zCd2bw56Xv-McH6LZDw=w3840"},
  { id: 6, url: "https://lh3.googleusercontent.com/1XqtTXDHIepD85cEanMHQQgkB4GE9v2J1r_kjQvvFhE-zD1ynsama2LXOQu9d0M80ZsXYMx94hsklmO_maKD_1REds6PimSSldCyMlfqvNJ0RUqdMR1u-B7YUdQfT7CqH5hJsEiCBw=w3840"},
  { id: 7, url: "https://lh3.googleusercontent.com/4WfS8IKQ8paXHnvwsoMZiXty6HkJWPgrIwvJTAT7gC5-HrMSQMIsGSdRAfjJzBNlDgepgGyhqIRSQx7MRV7i7V6lpq1_1oPTlJJ7Ro3S9I-JfOif2KGzqULO0NQ9jluDgpe37D_kdA=w3840"},
  { id: 8, url: "https://lh3.googleusercontent.com/or-b2GiKcnh-lQap_TbPJCuWIxX16SF8f3TWiZsRZgxm6jEoKtcwlQwxcAuphi4NmELNSySvRkuSrd_PzGbZ4Yfa4cSaxn4O7mPKGzKoPUR4o3-dpucgY9zapyyE580LcwYvR_4CRg=w3840"},
  { id: 9, url: "https://lh3.googleusercontent.com/p4pEoTP3H3XdAdAFWsIXEzLAbbam4FVc2GA-aEQnGMp8QjZ3F0i89QG8n9Rct4fzhhgLkAQiXk4GGADAqKNIAJaXxEXu7FNnoD-DWRq44bsVE4przJp0_qhgY6g2a_Z5lvR-99GOAw=w3840"},
  { id: 10, url: "https://lh3.googleusercontent.com/6YmATkZuUbKhE93f006PymNRfRhCk-EBHfTuIgQeQn945b-RKPzMgrnrhuJ0FEmUxQ6UZBuPrvQroHq7_SHbsZ333ztuNYjGJNZpqW-gxyYh9o2CUA_KEedsjUcJJQZBpcg2YPickw=w3840"},
  { id: 11, url: "https://lh3.googleusercontent.com/1kr55vVMQBHXcM99Nip1brDbysiTu68p3MzNXRHOsjZ8L6kbk9-i00XrbbwrwK4na_z5edEHS_sV4ykk4P3bG-bphK216xU5ej59ty3pbvXA13sQFK9o1gAULDMNYAvQVj2xjoDY6A=w3840"},
  { id: 12, url: "https://lh3.googleusercontent.com/DAL7Baa0g_g24mSFHRHDRPLWx6l3S5HgFObLZ3qMAFHwfvhC0eEcHl7KJSqQi3mVHloOz6KLe2fQKqjqXbLNMI9xE2Ng8qa6fW9HZ8viUMeMPHCVL5OOId2-AGUNb5uDElNx5TI_UA=w3840"},
  { id: 13, url: "https://lh3.googleusercontent.com/7BHTyHG9ieTEH-WH3pxHGzsAL295APdXMaH3nNCwjB-CgRvlSI-lBLDF4Mer-eAAhcIIghxDtZ2tgdbI6aaRYkamibR1zurIGmZ1cnZYWFELHQ5h3plJTbBm73W61VYDSkDEfMbRPQ=w3840"},
  { id: 14, url: "https://lh3.googleusercontent.com/rmzjIGabxVLhHBHFYYHnm7XgMQ9idZ0FvdK0WFd_5BlzZZnDK4ekOKLkfGZjkwtVzPp8J7UHxR-TaG8rAsvt_0Xp7wYMC85TzRHf0wYktXwSsme6mBaYoGXsEpvru6p393nF7Q9r8A=w3840"},
  { id: 15, url: "https://lh3.googleusercontent.com/od7IdvQVxVHouubtbgyamH1oHZVaJubczdc01IvAV1Ue_b3U6jd9MO6EPnQpHYwoh292odi8QyAOo25rZQggsCsYPur2bV4a3GnljCjxnm9jGjYu3oVuE4gAoUzpoIkW-q6xuLeESQ=w3840"},
  { id: 16, url: "https://lh3.googleusercontent.com/EhS45X7z9pYuTOJRZI88i6IKEVQZydE7-J7GwtUO4B16LuuixwBk1tfaFFHXJ8vsEBhwz3siYoftsmOXyIpY8cSQyFo6LASsXlbupMQqSQYO4ftaWHODpNKXBfklPCuhmrGKWDUOhw=w3840"},
  { id: 17, url: "https://lh3.googleusercontent.com/2t_R-e006-DyzVNa23hinbUcB3NFRSZCEzSvBEmCNYUNHzAlHBZyWu-pIFARSSb878dUCPSpQomXRCHBoGQDcVKU1IqqMDvd8OzKCWYoE3hXJS2S9ujNZPWAaV2FPWipDWE_xUKtVA=w3840"},
  { id: 18, url: "https://lh3.googleusercontent.com/AATYWP8vhI775BbhE4Luf6r9_MFhIZcozWsX4onR6JIkkeNeAgZW6sl17CmpPBRoBSDKx0GazE7keYY0H9En7Cmrs2MOK4cGC1tgyr-MHfT9zHbqQSKaYFLeKyWJv0bTYjPcKpsHsA=w3840"},
  { id: 19, url: "https://lh3.googleusercontent.com/_PE1-Y5eSE3g0Nsgwq8b2FIoNUw8gW0S7OmgbBB5SnYdA_eovuivNUWPJrGC5pndqLKZ0iNUK7hrMNdHzwY2wMLJXBgX_fz3jqqq1lhYUSq-fG7BUamMmGjzjq0qM6KMg82HHOssmQ=w3840"},
  { id: 20, url: "https://lh3.googleusercontent.com/YZVsoGDc-y__zTH1epD47N5-Y3Gh_IshGuzbSPfCdU4Nn0gYuIijxMf0R2-PCNRIKWuwnlJmKGUBrXhi__njXEv-fYRikZz6KBLxdro_it5Ja4grM0Uv8guH-Vzebfe6LGUdLG9EKA=w3840"},
  { id: 21, url: "https://lh3.googleusercontent.com/Z1XeUN7pz6oxSYXLC29DbCSczuCnpI-_HlG1IMfb3pyus8Vh-GK54pqzsDz7pT3hCPyb1E411h-JsiCojjKcKrw8qNq2wrF8BxqH6h1uQ6_RlPNhyVD9R398YWkIBUB9E802ZftEzg=w3840"},
  { id: 22, url: "https://lh3.googleusercontent.com/kAIpfWTq18tnJ-PqJ8fRBDcwtmVk9dFESITIpshZErshT7sTKc7Llj1SPL8DXqAOb1WyuguWeFJaOuIB-fH5VW_YkOXtH4K7tlMHk1I9k8YXyCk6jfM31CfhwrpN4vACLHBNo-_XLw=w3840"},
  { id: 23, url: "https://lh3.googleusercontent.com/RDBcJ8JOaR80IFPX0MMXMKYVsMTOFj3BE3xO0iTIiRNDk0U5P2yLtYpdE5Tv20oj9PyvTjayNIDHsPxmalWHMm16UW4htfw6OKxGCU4G117wawokKNEgzfA6Q1tz54VHnxxDnohQig=w3840"},
  { id: 24, url: "https://lh3.googleusercontent.com/KhkrFrJb-nH1RZ3377YlmnLPwrL9tJPF99V63_JBzLfvZnPdQx09XlVLcqLFVC3oiluKwyB5_Wy7zg_95XKkNrcEMzoyava3OlxjCthSiOeA-jMcQT7TW1-Uwz06IyaXyxSE6HtzxA=w3840"},
  { id: 25, url: "https://lh3.googleusercontent.com/ktpus3O9bJLz7IFrpI-a5-8ryR-y-XBNxnUZbumO1wXNFsk95mYT7RRTWzH3uU4hQbEkN571SHpkaU3M_d1rE2cRQ8SST5BkkuLamF_kc7w1bk_WIf4XdazssoQb9VCJlEsXTq5f7Q=w3840"},
  { id: 26, url: "https://lh3.googleusercontent.com/OTFnfgNsEW1yb71kj-G0aOH75QpBpvKPrKCyMqkjDfwBUxj_ly-8aAkOisLWsy6jTf8yHeSsBPUe0uPeg6IKrbkE9r-pHw51DtaMVY3RzPzR4Zj5TpWF0dRYjHAT_f5Wok_am9AvUg=w3840"},
  { id: 27, url: "https://lh3.googleusercontent.com/lcOrUFMkCggQJEhLF8gLyZ3Q576J_GJikNdbDcSIgbaJ5QR9S2nIQXdk1rLipgdmoyWIZ8D9QVJxWfK27SjgJ7mZSGvQJOvTTsG92BzppJnVUsgU_4xd5TrsSo05nOpUc6uzmvTm3g=w3840"},
  { id: 28, url: "https://lh3.googleusercontent.com/9Q3qzK0SI76mSXNkU1J34E6c43C8OzczK43TUektaZhL6Ngc1iadoeHH5uF12FNN1ejMvBP8gJT_VkLbynS9KIntpbS24ZuIkijSiQAL1PwH3pGjzOAOulS69TWzpQgU8fHNqGveqg=w3840"},
  { id: 29, url: "https://lh3.googleusercontent.com/gxsyfio2J6Xuh6_CSWoQvqoFLqpL4MVXRQOsAX4cSGWX4U5_MRrJfms2GBMECx7tYlLXDBNp3R7PK0BfKIwlPH7aZBUkLQu2hJr1BM6Zve5JpOzJStWiyQuDRBSOTlczCQpV1MDOpA=w3840"},
  { id: 30, url: "https://lh3.googleusercontent.com/SjCY38ERsn_-0amIlJ2Dh0B6BkL3J1OUy0bGVLmRvwjuFjXjAKRWgvi2qaumF834gDF8BKJSRXC27MJ4dt9J2O8g5Aya-lj0zg01z4nkfhEoKX4FYwwFfIHXI3_Hjmq1KjUTKXxDlQ=w3840"},
  { id: 31, url: "https://lh3.googleusercontent.com/imXSQPTvEMCWTqCWI0pOaV_5ZYI_9OsNjvrLstvqeqtgq96lmX4aCTIhj0ZS0_owxXRB9XzqENrWEw1xfTEKJyQ3K52JFEHyVd-Fdxj6-I9QhvdCXvi8EwSAQDD_nvERP9cQR9SR8A=w3840"},
  { id: 32, url: "https://lh3.googleusercontent.com/AascR9GZvv7TH_L1zreCCQkNY0WGWNb71t2B0iz0eGUo6RIp7qg93ab2qrkl2XNIE4R9uTxNKjiqn2KqClQdGsDyfdyXZiSREJlhDbm0KwuIcijkGOJFTfUBfDuvYcg-OiO3sf42Jw=w3840"},
  { id: 33, url: "https://lh3.googleusercontent.com/f-2G6Tur1t3nznvmces3N6pVo7DEcNdlt7KovLKPPGhFKyj350s9FlUp3ThoSo69NT82zdYfy46wGQ0uN2Bnl7LXZLdmtjrQ_s7LC64qhRCIR-aUg2L9UKo-IFlY4ZPTl3guJAldOg=w3840"},
  { id: 34, url: "https://lh3.googleusercontent.com/cPcXpsVAKNPTLvTnqSOvgkAx-n6d76HqjMGefJrg6B_yr-CiYgGicmIR-htNSv2cp3wWeTAQ-A4dQl0uBKBiJHHUuzEFm22FHm3x40YtFmHi58hwhpkx6tKHUMHGmmspd6EDrORqNg=w3840"},
  { id: 35, url: "https://lh3.googleusercontent.com/sH10dzaQlep2VDoWi7SruRPUE5khNsF6t5I7imEl3BbxTkE2s_4kDK4YHgH6Bv_mPO7CYPSJw4eJDIOPKPJI0TgMJFn01mtQlU27d54BKQBciI7FibR8TZ9w_yYEMNca5vv520l3Ng=w3840"},
  { id: 36, url: "https://lh3.googleusercontent.com/RMrvZqGCff49A8Cv9svuAGQhVb5solg8AcD48sALBmVmI9w7jubcQcSctHq4YlBSxG0ohpcaq_na2C5CsqBF_MAOvoZgOtfc0Q5HedlQFub3NRqixzxsu4lmh3QQlllaCUi0RD4C2w=w3840"},
  { id: 37, url: "https://lh3.googleusercontent.com/_vkRyQFUkB0S1rFXkapZokjag4_Md2XGWDkyEE9FUt40HqFIvEN4-mIEYNl8kpx5ohTw9rcOP1KHA2PRiflXgmYPtHoFXX1PqH0IURoT6b3fMKsBQpWUHzSapJ6h3NYKrDzO9zodmg=w3840"},
  { id: 38, url: "https://lh3.googleusercontent.com/AFHZnynsIvFIbMPyNv_TxZWClk3jsC0n5J9plLAofXXX3nCYI_Zvp4Wm2ow5Rogz7lwW3p-dcxJT817PX32IUbhMR0gNCAh783qDajKhWZiVVFiR5dQ_kKUfngxgI0zwJBBazs7DPQ=w3840"},
  { id: 39, url: "https://lh3.googleusercontent.com/rhmzHZE1hQ7WBS4O1io8RxZkIxEHlWbzDmJA8-vnOZBhEHe_wz351edHKjYV6szuoZh2FL0y1fwIZWkFf1W_AT5iWMx5RxgHUOG5ZceEe44YEloWUWbRBjcEiY_x6hjD3R7xRIBTuw=w3840"},
  { id: 40, url: "https://lh3.googleusercontent.com/wfVMDPorUncqZP1FZ0CMpNRB2z1pm9026NXsNdC1G4ha6yot1V_4MI4XmlJlldBBFvcqfpJKIF9ckMqzVTp9wcEwGPLNpPHnsp5xdk2mvrv8LOSdzPsHFgVXWccms7BrGhKhrxbE5Q=w3840"},
  { id: 41, url: "https://lh3.googleusercontent.com/D4YqVNVWBzwTpeEgkjOWW-3zj_d1yTipHXKleHS1zlLaIAYie6MMxTH143JzOWQDZtmpOX5LtPhKAg_rfjZBguZaCqaWY8KGGbjk6ayzcUyCl3L2_jbd8NVEFXqIOIu6-8zS32dAPA=w3840"},
  { id: 42, url: "https://lh3.googleusercontent.com/Gl78FAuPuxmNf-jb0zUNevlMo_Jqcbkyxq5MTXnDlppfDuocIAKoJbaOmlSAKmj_Kdm3iSrbgZMIJ97NMM6K0k59_93g-Sdh2qCPFp1X6XBplQKv1ME7-YgSLd5OqDIENLkD4-WRuA=w3840"},
  { id: 43, url: "https://lh3.googleusercontent.com/gv1FA_fhT69AtsWMb3yADW_djywKArPKgkkdtzJNKgzdq7shn1Z9j7cDUwQK8Ij2ukMOUOda8TsdthBAONy09naJ1y_D-gRM3QYJuOSg_maLmaw_BODo503770jJBCHQdzq93FtxMA=w3840"},
  { id: 44, url: "https://lh3.googleusercontent.com/mghyHRZ58PdBvrWwXf4-4WwOSmHeEDHBCs11HMPPiUmY9RZnIM1C7bj99o0Jt87KpS0QhElH4nXh1fhVtZfK4dl3RATVLMgEHrDzYRSghZh_A2VU-Gy0WkbdN1WwWPKfOAAWZimWSA=w3840"},
  { id: 45, url: "https://lh3.googleusercontent.com/SizqqLLFoUai9sDra6wrX-mqFsaYedQUHYdhNWs7aFZWTLs2cQqS9zkeTo_82wzbu6pYzYqx3nKrVQ0p8l4k5pmBS-iRlOoHAph8eIoPPAAsTMPejz5arLAZzED_919NMkUSOlMYtw=w3840"},
  { id: 46, url: "https://lh3.googleusercontent.com/GiUBt4GhvxL1FuXgtStFaQGfQiokGgYAx-xiv0xrH-oj8oK4IHZ1277-8T-jx-glz3KIaQpqayEW2Hyb0q1kLaQfkRY4lWwVMVe3HC-UUQwSPdvK0osd9HiEPlVXZih6q2p-lkLPsw=w3840"},
  { id: 47, url: "https://lh3.googleusercontent.com/UQrbKfpLGl07dnkb0MwaqB-o3dV3MwkjlgjLWmf7FwAMEnTLNNZGmI3ViP2Eq9ndfiTYIws8LaGZZdTg-kr67GvXEZwr_Z7BdMvUV7ukKkmPZ-yjrLHoYhrLvF6fJ55bkaJZNVeV6w=w3840"},
  { id: 48, url: "https://lh3.googleusercontent.com/xrF5w16KP3OPTsVcA5-gSjt4EfkIWmWBQDo1GZ7WplbvKPdfJBmfk5WjTE2z7JC_FtNJTE4OoUQJIye5yOg94mTmW6PwOjUEkERXrNS066Ou_RD35FYwdpIqbHJdCaRB8TILUfiiwQ=w3840"},
  { id: 49, url: "https://lh3.googleusercontent.com/pIb58qcMIQdkunBCZ1k41aKL91A13zJkpz-MBindDOLIdLMgHIZICgmz1hJrqhdqKuLDoaJr6E6whWhew3WvoCQofUQf73Xf6UrFy63Vn_5v52g8h1ZoeZffPswjjJ4F9FPyVkjh0w=w3840"},
  { id: 50, url: "https://lh3.googleusercontent.com/AHAYeBpvgBMEkEgWQmWvC1pSCZPRQ7BtO0jj2HVdC0kxGbI5dZRmJGnrnPVTLOrr53Bt2rA_gVob-Widz7SzSh3wUDjHHh8bR5pB7tQAy8H0NilNZOZaWMU3F2mZMAXGaMVy9pwP0g=w3840"},
  { id: 51, url: "https://lh3.googleusercontent.com/5tnXDuNEZep169UvcTFqOtkhKfsK2M40ik2ryJAmoXNjwq4H7JiQ2TQiQ67oxAqrn0zOoC-7WknHzXxoEgc82-IFkqM5nGAU_OzP_Zy3H_0TMjrTx6mGyBi5OMqye5owSY4rWOAn9Q=w3840"},
  { id: 52, url: "https://lh3.googleusercontent.com/8BgsAlUPXvarFO_wYRcnYy_AxUk2EukQoFKXHwIVn5G4COk5OlMWOEkJ1uqcDvIpx5ZOTohCclfK7T7I3jbYJPttIjGGiF9_c8NXpYyymCmmExQPijIItfhnuj19iwD9QXNTKNlcwA=w3840"},
  { id: 53, url: "https://lh3.googleusercontent.com/pemu09Wux-MH4qRMrmZrtL-yaxJy-khd5apj3Wp3m1vpVeLo_8HcDwBJWxLVo1LmLqWsXUGfDLjB5cD19W81TkawOMvnPRvaLcsKLdc0hNtQjQ0_8xy16nJCkGG7MLaRDIW3ZJ0moA=w3840"},
  { id: 54, url: "https://lh3.googleusercontent.com/lExlM2KwuihrxmMCuxt-JadkSK0xYP2L9G3C1Mx7KMgn9RJQz6nkR9SqHkXeC2LYRSphZKyOhoOkUrjloWLJLm98St15f-C3P3Un-rfrSgfcgvfCLBrQ7byDbcEI8FVfLZsUDC5o4A=w3840"},
  { id: 55, url: "https://lh3.googleusercontent.com/BTN62VHEvA6Onm-5C7A-a5vI8GZbidZUA6LASciK_9ongRjKi34fJrukChS-qy0vqhnC5o-WfR5hHwa8ElXZrlKKx6DutYaP1a9Upjxa8nwQ0nSW_wQZUqnY183RYQBfWKv49L9Uww=w3840"},
  { id: 56, url: "https://lh3.googleusercontent.com/Vgn2KZM7E5w4SZW5MPcWmAomRzqcPKS8ffURNT5Ocr_MKrW1dohcPcM1-m8W2JuyQP8RJjkNmaRmvLt2P0svkWB16GPbDxFZEzADy8DlyfYj-UAg1htuZpCsr93GCzr2KkclAzkgqA=w3840"},
  { id: 57, url: "https://lh3.googleusercontent.com/EJ8UxUMpOAvO94E5cyKG1AFRxR0R-mFGWmkUJMIDFwrCPADtdkgA1qpXC12AQxpZaGSzOh9r5u2kb4TvqvJ6TnLwdlPhQTCPQZp3sfSnC5n3bz9-7WDJz5odJX9YRK3KAFzbihsjrw=w3840"},
  { id: 58, url: "https://lh3.googleusercontent.com/sVqnpwUIyk5WGC8LYQm_0xb8d8Y5aXw6Kf3rk_Id5QLoWVtOMhVWg9T08VCRLnXn1so611EpvpMA2Pc0CqqdaDOY6TSGk9ShKM5v290cKve9gOm6VeEJ8emWcHU0c699-_8gcZKlBg=w3840"},
  { id: 59, url: "https://lh3.googleusercontent.com/FNpQancFbhjW7prIFvsJzndu-urPTNwy8vcOWh0aOcOwW__eok2HUYoAap5kX1mwbfYogZyalhot0t0feTzWaiK8DuNNkllKU6Z7SeGPrG-pnXW9w92b60fouV41zJnup_haywKSRw=w3840"},
  { id: 60, url: "https://lh3.googleusercontent.com/fUQ9jh0VMGfjknAfDZhCuIpXV9_W_4ScUTcoR8-IofmtFz5V2dbYFmW5rD9LAu7QphJXF6NGgrPsI-wcM-p22QNdCThKESDjK0rGbniwDBUSgJiEr8JMQ_vm7XCZvx1TA08iWN0-Fg=w3840"},
  { id: 61, url: "https://lh3.googleusercontent.com/cxJRMhdAGJ2gK1gUfCE9Az-pyYqqj4knJz-V8sRiaPC7wweXDGSrDIv7PBqvyzWQHkbmR0QR2-yBPHo8gGXAF0pHFz2mklYOA9dl3W9xhBe5gKHcBUrq0F23x7MIzZ4pxLxpOlsqZQ=w3840"},
  { id: 62, url: "https://lh3.googleusercontent.com/P_4PinQjQXMAh04INeeyZLXbrWqYJgh72QfrE781izYpCeNu_08F_88NVc8ljKOJ5sFjzKzqc_yXmc3SLsNlmMrLQjeAeZARXU0jitgm3q7yLfGTJojNYuWeK3C3oCuycUUCwQyIUA=w3840"},
  { id: 63, url: "https://lh3.googleusercontent.com/vTVx3GhJlQreriym_rxF6BsT-Rtb0rN9mfyU98rR76K9MkFG2161F4lmh2kU8nACLvMmX0dCnkGCRe_8uch8krKRQVqw3U5htxgV5zS3xL8nZ9dFLj5W0h2AMu0-Jpn5jQOqnp6wMg=w3840"},
  { id: 64, url: "https://lh3.googleusercontent.com/kTHafSR6Rrh1W1TPMT7HuWM73rhEgRm-02z2LktixgMfSfPBQamKkxIY7uEmHrbQoSXHyZudj4SYb3I56hz_NAukfXqcJDATezCD-3mWpeJfwvdVbpPCgQvL423ZChmwXpDwBG7nZQ=w3840"},
  { id: 65, url: "https://lh3.googleusercontent.com/b8bSHC-QO2_ZS8WESzz2k99KyL2PM1a0UyJvp4V1hJeSmLgH1HS38Dhf_M_QFef-ypxAz6warhQgTk1a_7IyGs_grXSL8K3A2qkRksbYUtxSqgpCkiT-tEng-8jdtNYHwIR7or0NJg=w3840"},
  { id: 66, url: "https://lh3.googleusercontent.com/Uj1xvKz3UP0eVxiJt0-5xyfcmgYxfF3BXUdW8uVZHrgVZVzq0JhvrzxQMeq7d70JdA3qmZqEGrwP4YCtIiwqMGwgzw-qg6XqjFACOjxLhp23yprVEO2436vypfOtp4ElAXjBDe0e0g=w3840"},
  { id: 67, url: "https://lh3.googleusercontent.com/pihbtI5Kn_T7b_8K94zfKVzfLESLLEoSoDBpBbNsweJ_HD3AAj6e2_ogsTEYYjIZ3n3sAgXyBjk1Fllz4q3SrZ4aZB2ZxUlrKHfOS_L1C0PObzx4ftjLMoMDv11Zq0VuFAEiSt-Thg=w3840"},
  { id: 68, url: "https://lh3.googleusercontent.com/9_3kA6XltxDVZ576NJg1yA_QfTj1byum2fS7592uWhRg2JeOOsj7_CJyl8Z565XvYmcGAsgYG_qTC-IKiItU_Hhtdx1hg_ZmVLhmmUTWq5DH5aJysIYlCI-nVsWSAkmwRZDlEej1bQ=w3840"},
  { id: 69, url: "https://lh3.googleusercontent.com/3XsXWFiFSoFiOk8-ZpxivEq3rpmshIOJ9VTXe4qObFbXtvf-ADXgLyJ7N6XhtdXh2-pk3tmAUa776AmZEef0jc7VLbgZO8zcJk_lrjzrrCyuNmFouHLrqd4MC73JMhuVUWLQ_Z7K6A=w3840"},
  { id: 70, url: "https://lh3.googleusercontent.com/SH2sOtQ6qLNDtb5DK2vxFhxkCcOAg65yXjeaDRvycardO8e8XjUj6wU2gdNignUhELROwpndS1awz6RWquSnyMeWo-bexIpmCHCT55fvgrU6UuNmafysXgSqFQgyO7WFL2ve0kwPRQ=w3840"},
  { id: 71, url: "https://lh3.googleusercontent.com/7Oe5QRw9EZhu75W7ErW9AFSRx8dALPA08PPY224fm5khGT1sFquVEh3aRTHkUxj627I2ujBH3rhv4tZWCAmsO9Qm9EFBS6SGpPv8M9I90MW7-Ls6AgfXBW84FXY_7kIz-LOyK0MZiA=w3840"},
  { id: 72, url: "https://lh3.googleusercontent.com/2Ylum9Sj06WNemD7NHApC83EWoEaTVyHNv5B7usA4V1HXcIkSI8iMcyor4KgYoIaTyyuzeNxNZIcHDEu52WLbAWq_6a1XL3tC-UYRjpbv_Ks5OyU_eJxu0x0AySZnTI-NHyon-omDQ=w3840"},
  { id: 73, url: "https://lh3.googleusercontent.com/pELGb4_k4LqqKJoVyOSSuSYacENcbC3isdqZygvxQ_XUnuyrjl9W0BHXsDWI2TCx6V0dCuQffYM51R6cNufPazYh6NWLOeVMj1HunfUWtOoUJK99rOZ0csuXhfKGJjQFnJGJHKi47A=w3840"},
  { id: 74, url: "https://lh3.googleusercontent.com/D1Yh2BY2T9VT_7lspVnp-52A4q6GfI9rRTT58bE3j1rv1l-BwfvkvCDRKHg9OKbdHq2UFFjfwYmjVsAxrD4qTT4TX1XicVvoIH0iL3YUW-ENomBf-2UHY8wksviRHoGt7DaoSVjp-A=w3840"},
  { id: 75, url: "https://lh3.googleusercontent.com/apOIMklu0FQE4etmJXKNCeXdiauEpCMipzb4pUSC70xWuarCJwbsUB3_92DpHSuzRgW-m7vf34-eklnFN_doFXz-xMMIMkeGNoG6kHHlhYhrQXSyW-GN_bm2rzKqiTEnSrN03Y7OfQ=w3840"},
  { id: 76, url: "https://lh3.googleusercontent.com/mcqO_eHKy89VUGA3ao8hRKGSrlEdbfcu5dZjQ2KuOcQCWI7FEQSDtmoatn7d7kzQUuIBHyvxGrElXEUf6GBnbiRLlsGSNGCbLs9pl1xBwLqt8L22eeyUUhfxg_grsyJpmiXTEN1Wfg=w3840"},
  { id: 77, url: "https://lh3.googleusercontent.com/5ldKiicOMXyrWOJVHC3MwfJpmFbrDc5UmqtRUnI-dyX98nOw_BhUjmDTdG33EW--5pNA4kJw6puZZGrmcZt0hwdUaDhdxRmKRnTyM0Ns6S3dw2scrA4cQpPFyxsUdiKNPskZaKs1-Q=w3840"},
  { id: 78, url: "https://lh3.googleusercontent.com/65ul9xsZRV7Ehxnz9Qu6oB7F2qw1IvO9MaFP96TU3f0pJBvsLPz6CpFht9N9xY_Me4xiWavjLdzxoB0blO3LnvVURat-eCB4DVisvYO1riOqI1puREot-1b_VStcMMvFq2PJiK7B8Q=w3840"},
  { id: 79, url: "https://lh3.googleusercontent.com/vGagrDtvzcUHh8e7M1y76pcl-qRtMuud4pohXysyHI9m2yzgbO8DuPY8-ou8gfPH-1Y4Eh9iGpQDKG7xN2-ZqIZRxjCDLBI5bkV3Djl8TZaLc4LNnviDmbAykeycSJA5dKB2waazzg=w3840"},
  { id: 80, url: "https://lh3.googleusercontent.com/45mytFL0SyeNeh1zzQpC8902L_mqTY6PLEc4eaIP8O58rZK71_0RJDlisxY8sTzy38vNxlRbs0o2sFV5Y29CMradCdTaH2n8pxnQ4VwFmEms2sC_DKZmCzHHgO1b0vPasgs5mzYOAA=w3840"},
  { id: 81, url: "https://lh3.googleusercontent.com/KDb8fMzUPdCdo0DeCsIhWaYpJTM1hcX95t2r4cD757d6ifBStrsGPFEpgbpbuaokPNvHS2UE-jVLXR3V88e3YlJqklITWZqN2vxMHc0n3F2P3Dt7m4JZALRfdShY-xLiE4mml6T3uQ=w3840"},
  { id: 82, url: "https://lh3.googleusercontent.com/TA4fl14caVmCUAGPVKPb-hoAV2g4Sn110Gaom_vKEbSGLAE-gDWOrMq0jemQXZxdv5ogvcPxJZZfe15HLAB-H9yuoP2TCFhv2CN8jrss7OHHc_W9Iuv9WFyd3OEKhVnR8ZR2JnzfwQ=w3840"},
  { id: 83, url: "https://lh3.googleusercontent.com/_zDQsCKT03tIRhzFYMqpvSGDG0UgRlOMq1flUOrQeGc-AYuzTFTbH5nDnXmlMBVLinmxE5QkfEvIfXrG2jYrc0wnOxD-GABF3aVwGwGPBXA2inNr2XPlWh1i7bjENWfrZWDCNJh7Lg=w3840"},
  { id: 84, url: "https://lh3.googleusercontent.com/f6mAGgteDDiXx6-q8yo_WLVMCvc5riI-4p358EjK4u4_4paKQ81_S1_8tqxnTpPwAyTRmsBN7qsekemChHcqFBfhvhI11W-kXu3hiTIBLwiorJyO50V2ZYsssdfbmza1NKl1xsQ0fg=w3840"},
  { id: 85, url: "https://lh3.googleusercontent.com/MGbF8nz38j9sEV5MFL9K9w2YL73avZlgUxLJ8aRX1wjV_AYMMU6_fpGKAmKh9Kw54URFnUSIl9fRIi2bv4_v2XtbUgM8H1GxYaTpcCxQbI9b_Yf2PjQaXpBDYV3AsAY0YRsV3FnNPw=w3840"},
  { id: 86, url: "https://lh3.googleusercontent.com/s0CRqXYYcdZG4XQ0mS9mper8OOlp4BXzHmeqpk8JqQbqbVi3hesAshGBmpdl2IBCJ4My4a71JOlrncKKv_dtEutOynfkLNMCJssMTn4BVrx1DLiYeVTfADMRZ11sJHyV1tYTQjY5Kw=w3840"},
];

const slides = available.sort(() => .5 - Math.random()).slice(0,useShowcase)

const Home = () => {
    const [index, set] = useState(0)
    const transitions = useTransition(slides[index], item => item.id, {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
      config: config.molasses,
    })
    useEffect(() => {
      void setInterval(() => set(state => (state + 1) % useShowcase), 6500);
      (async function(){
        const values = configProj.albumIDs;
        getAlbumsArrObj(values);
      })();
    }, [])
    const [loading, setLoading] = useState(true);
    const counter = useRef(0);
    const imageLoaded = () => {
      counter.current += 1;
      if (counter.current >= Object.keys(configProj.albumIDs).length) {
        setLoading(false);
      }
    }
    // Querying everything parallely to cache on homepage
    return(
        <OuterWrapper>
        {
            transitions.map(({ item, props, key }) => (
              <animated.div
                key={key}
                className="bg"
                style={{ ...props, backgroundImage: `url(${item.url})` }}
              />
            ))
        }

        {/* <a className="sidebar__logo" type="button" href="https://www.iittp.ac.in/" rel="noreferrer" target="_blank">
            <img src={logo} style={{height:"100%"}}/>
        </a> */}
        <div className="fader"/>
        <nav className="navbar navbar-expand navbar-dark bg_under">
          <div className="d-flex flex-grow-1">

          </div>
          <div className="flex-grow-1 text-right">
            <ul className="navbar-nav flex-nowrap" style={{justifyContent:"flex-end"}}>
              <li className="nav-item">
                <a href="#" className="nav-link m-2 menu-item nav-active">Our Team</a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link m-2 menu-item">Blog</a>
              </li>
              <li className="nav-item">
              <a className="navbar-brand" style={{"marginLeft":"1rem"}} href="/">
              <img src={logo_i} style={{width:"50px"}} alt="logo" />
            </a>
              </li>
            </ul>
          </div>
        </nav>

         <ContainerCustom>
         <Container fluid={true} >     
           <FadeIn delay={100} className="justify-content-center row row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1">            
             {Object.keys(configProj.albumIDs).map((name, index)=> (
                <div className="card-deck" key={index}> 
                    <div className="card">
                    <a className="entireCard" style={{display:"block"}} href={`/gallery/${configProj.albumIDs[name]}`}> 
                    <div className="card-body">
                    <Skeleton style={{display: loading ? "block" : "none"}} className={"setHeight"}/>
                    <img style={{display: loading ? "none" : "block"}} className="card-img-top cover" src={getAlbumPreview(name)} alt={"Placeholder preview"} onLoad={imageLoaded}/>
                    <h5 className="title">{name}</h5>
                    </div>
                    </a>
                    </div>
                </div>
            ))}
          </FadeIn>
        
        </Container>
        </ContainerCustom>
        <div className="containerAn">
          <div className="chevron" />
          <div className="chevron" />
          <div className="chevron" />
          <span className="text">Scroll down</span>
        </div>
      </OuterWrapper>
    )
    // return (
    //     <>       
    //     <Jumbotron className="jumbotron jumbotron-fluid">
    //         <div className="container">
    //         <h1 className="display-2"><b>PFC Showcase</b></h1>
    //         
    //         </div>
    //     </Jumbotron>
    //     <ContainerCustom>
    //     <Container fluid={true} >
    //       
    //       <FadeIn delay={100} className="justify-content-center row row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1">            
    //         {Object.keys(config.albumIDs).map((name, index)=> (
    //             <div className="card-deck" key={index}> 
    //                 <div className="card">
    //                 <a className="entireCard" style={{display:"block"}} href={`/gallery/${config.albumIDs[name]}`}> 
    //                 <div className="card-body">
    //                 <Skeleton style={{display: loading ? "block" : "none"}} className={"setHeight"}/>
    //                 <img style={{display: loading ? "none" : "block"}} className="card-img-top" src={getAlbumPreview(name)} alt={"Placeholder preview"} onLoad={imageLoaded}/>
    //                 <h5 className="title">{name}</h5>
    //                 </div>
    //                 </a>
    //                 </div>
    //             </div>
    //         ))}
    //       </FadeIn>
    //       
    //     </Container>
    //     </ContainerCustom>
    // </>
    // )
}
/*Polaroid Version*/

const OuterWrapper = styled.div`
.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  will-change: opacity;
  
}
.bg_under {
  position: sticky;
  top: 0;
  left: 0;
  // transform: translateY(-100%);
  width:100%;
  margin-bottom: 72px;
  margin-top: -72px;
  z-index:999;
}
.fader{
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  height: 100vh;
  // margin-bottom: 5vh;
}

`

const ContainerCustom = styled.div`
   
    // margin: 15px 15px 60px 30px;
    border-radius:10px; 
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    
    .setHeight{
        margin: 5px 0px 15px 0px;
        width: 100%;
        padding-bottom: calc(67.67% - 20px);
    }

    .card-body{
        padding:0px 5px 0px 5px;
        background-color: transparent;
    }
    .card-deck{
        padding: 15px;
        // padding:5px 8px 5px 8px;
        border-radius:0px; 
        background-color: transparent;
    }
    .card{
        margin: auto 16px auto 16px;
        padding:0px 0px 0px 0px;
        background-color: 	#1E1E1E;
        border-radius:0px;
        color: #E2E2E2;
    }
    .card:hover{
        transition: all 0.5s ease;
        background-color: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1));
        transform: scale(1.02);
    }
    .card-img-top{
        // padding:20px 0px 15px 0px;
        padding: 5px 0px 15px 0px;
        border-radius:0px;
    }
    .entireCard{
        padding:10px 8px 20px 8px;
        background-color: transparent;
        color: #E2E2E2;
        text-align: center;
        margin:0px 0px 0px 0px;
        transition: all 0.5s ease;
    }
    .entireCard:hover{
        // box-shadow: 10px 10px 5px grey;
        box-shadow:
        0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048),
        0 12.5px 10px rgba(0, 0, 0, 0.06),
        0 22.3px 17.9px rgba(0, 0, 0, 0.072),
        0 41.8px 33.4px rgba(0, 0, 0, 0.086),
        0 100px 80px rgba(0, 0, 0, 0.12);
        opacity: 0.8;
        transition: all 0.5s ease;
        background-color: black;
        text-align: center;
        margin:0px 0px 0px 0px;
        text-decoration: none;
        transform: scale(1.01);
        color: #A2845C;
    }
    .title{
        font-family: 'Permanent Marker', cursive;
        text-decoration: none;
    }
`
 
/*Non-Polaroid Version*/
/* const ContainerCustom = styled.div`
    margin: 15px 15px 60px 30px;
    border-radius:10px; 
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    
    .card-body{
        padding:0px 0px 0px 0px;
        margin:0px 0px 0px 0px;
    }
    .card-deck{
        padding:5px 8px 5px 8px;
        border-radius:0px; 
        background-color: transparent;
    }
    .card{
        border-style: none;
        margin: auto 16px auto 16px;
        padding:0px 0px 0px 0px;
        background-color: white;
        border-radius:0px;
    }
    .card-img-top{
        padding:0px 0px 0px 0px;
        margin:0px 0px 0px 0px;
        border-radius:5px;
    }
    .entireCard{
        padding:0px 0px 0px 0px;
        background-color: transparent;
        border-radius: 5px;
        color: black;
        text-align: center;
        margin:0px 0px 0px 0px;
    }
    .entireCard:hover{
        box-shadow: 10px 10px 5px grey;
        margin:0px 0px 0px 0px;
        text-decoration: none;
    }
    .title{
        text-transform: uppercase;
        font-family: Arial, Helvetica, sans-serif;
        text-decoration: none;
        padding: 15px 0px 5px 0px
    }
` */

// const Jumbotron = styled.div`
//     // margin:15px 15px 30px 15px;
//     padding:0px !important;
//     margin: 0px !important;
//     // border-radius:10px;
//     background: 
//     linear-gradient(
//     rgba(0, 0, 250, 0.25), 
//     rgba(125, 250, 250, 0.45)
//     ),
//     url(https://source.unsplash.com/1600x1050/?nature);
//     background-repeat: no-repeat;
//     background-attachment: fixed;
//     color:white !important;
//     max-height:calc(100vh - 30px);
// `

export default Home;