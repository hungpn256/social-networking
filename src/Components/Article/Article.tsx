import { Typography, Switch, Image, Avatar, Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LazyLoad from 'react-lazyload';
export default function Para() {
  const [ellipsis, setEllipsis] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const { Paragraph } = Typography;
  return (
    <LazyLoad offset={100} height={100} style={{ background: '#f5f5f5' }}>
      <Card
        loading={loading}
        style={{
          boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.1)',
          borderRadius: 10,
        }}
      >
        <div style={{ display: 'flex' }}>
          <div>
            <Avatar
              style={{ marginLeft: 15, marginTop: 10, height: 45, width: '45px' }}
              icon={<UserOutlined />}
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFRYYGBgYGBgaGBgZGBgYGBgaGBoZGhgYGBgcIS4lHB4rHxgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHxISHjQhJCs0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQxNDQ0NDQ0NDQ0NP/AABEIAN8A4gMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAEBQMGAAECB//EAD0QAAECBAQEAwcCBAUFAQAAAAEAAgMEESEFEjFBIlFhcYGRoQYTMrHB0fBC4RQVgvFSYpKisiMkM3LCB//EABkBAAMBAQEAAAAAAAAAAAAAAAECAwAEBf/EACMRAAICAgMAAgIDAAAAAAAAAAABAhEhMQMSQTJhIlEEE3H/2gAMAwEAAhEDEQA/AKc2WJ0C1Fk3AVKfyIbRR4i5tE1C2IGwyhYmqcwodUJO4fV1QsEUvKxqMOHkKF0Gi1hMhsqiocFdysAlFPgOGyzNg4YwBbfHAQkZ5CDe8oUYYPmkI95KiYCpsqJiJY1qlYxSsYtZiJsJSsgKdq054QsxoQwo4oXToiieaooxtjVNBYooZUofRFIFhMRlkLluiWxK2UT4e4WA2OZH4UDHbRyPw34UJNt4kr0PHYBOBAsPE3uExnG2S37ow0JyfIv2E3YjyxLcDiDKOyauRCR5Vi3nHNYsY8+ZNPbusizDnaqd8sVDEZRBGwbl5zLYowTbSkkZbYDRZow4iRgUvj3XBqFy6IskEf4VDBATaLLNIVVkZ7LZNRiizFaZxNyYS58kmbpiq00hJ2GUXQpEtTZcxGUTSOQlsd6dGI2BY99FNBZVajwljAropUfvET/DLkwaLGIg4qVjarRICxkS6xgpsFdPhWW4b6rZeihWQMaQpg+q1lUbXLAY8wx1lHPN4lzhRU+INulY0WLptnClDmp9HbwJK7VHj/RubxjfCsRyChKMjY6BoaquqJzk9Eu7HX88dyWJHVYtRuzLniEAMqq3OxqFWTFnaqqxIRLqlc8JBiwYkkplKQAdVCyGFJ/EBu6rY9hzpMFROwyq7lpmuismHyRIDnDXQc+p6WSylQYpydIrsLBz+a+ClZJBvwjTc39dPp0VnMAZehuToSKen28kK+WsLU9AP2A9eyi5SZ1xhFCB8OnU8/2/OxQhZEeTQlrRvpWnoO6srZYHtWg8PiPSlCKfsh5uEDwNFK0r2rp4kU8DyCGRmkVj3hvqW6V5/f8AO64cyul/mrU7DGnhGwudP7fgVfmId3ZGE0FaX05nn2+SaMsiSgjiCKWW3vXcswO1cL6ag/utTECiqnZCUaNMeFHEIKFc8grprzuEwpDGbyUMMGqLeVEBdEwZLNRrYSFlyj4LkLFZHEhUCWvNHJ7EFknmGcSIo1wqIKo3EG6JLhjqPT2dHCEGMgN44EgiDiKsTBVhSGaFHJYbY3NpHBcFjZZztAskm1fQq1ycoLWVGyaiiufyty0rn/D9AsQthpC7EHVVem7FWCLdKpmWJXLFkouhWwEqeDIkmqPl5OgR8GGAquVBciTB8OBcK6C57DVWCbi0o0b2p0tYd7N7FCSQyszf4j6D70p4oaPM5iT1oPWvyUm7O7gjUbfoZnrQag3J2IAqfP8A+uiHnZqjeW19iTT5j/aeYUsF1i49AOX5Wh7NSXE4+aI1v6W3pzI0HalbIrZZ6CGzFATcUGWm4Fi7uTYefJdS5oDEf/SOp/YeQ5oVjKuPJopXtXMetyf9QRr3VIFLMOmxcPpU/wC1FgDZZmUUN3G7uhpZvhVvmVPKYI0CpuTqocJaXvG4AqTz/K18VaAyySg2ed+1GDmE33jLNHxN2H+YfVKYMbOy+o1XpGLSwexzSKggg+K8yloJY5zHasJB8N/K6pF0iU0SS0sCapi/DahdyctluU3hgEUCzbuzjlLJWImHEaoOPAorlMwW0VWxR4BoEyk7CpEEvyTCC1AyoTBpoFQzZ2SgZlt0VnWosOoqigAkkaPCsUyKsCrTOF4VnN2IMZAcLQpHPDiT2CNUlxEXSw+Q/JmIPIfGFfZBlgqNhv8A5AvQJIcATvZOOifIsWZliwxWYbCpTAR7oYaAoHvUlx5wcspUwcsAW4cME0W8tUTKsoa8k7hi2TjK5qK9JZ52RrWjYHzp+x8km97RrSdyXetfqU1n21PYfIH7pTPwqMb0qPMuH1XOj2kqVBjZujBXkPCwHoCUmkKviOdXepPLcV8x5qZ7qi3I/Ij6LWFgNbErtt02b2IoPFFaC9jCVeMxy1o0dri4B5beXRTxeBlTrQW5l1wB+fJD4COBzzcuJPe5p6FCYuYj3UZXfQb7+tB4IPMqN5YzkGTEPia4cVyO+ytshNOe3jAr0Xn8hKxWDNmfnz0yG4cy1amlK1qvQsMlnZDXWiLWQJ2hZiuLZHUDC/sqTi0T/uWvawtztu07lvzqMoTXFZyKx+VgALiKvc0kDMSKN2qNb8wkmMTT3Pg58uZj4gq2lCAWXFEUhJPwtuFMYWXGhp4H4fTKl827I8tbobj7LvDZkMYe/wAtPQhSNh+8dmITI45LIDFjOolb8NdENdFZ3yqPkpIWsqqJL+xJ0VBuFuYtsYrxOSQymyp0yzK+iCwx07Bo0KigdFIsj3tqEDNsomG8BK1cD1VolxVngqyzUK0SN2IMMQSCLlJ8Ubcp4wcSUYqy5SL5FZfFi6SdR4V8kovCFQGGjgeqt8hH4VRko6GXvViF951W0BgV8+CNVF/FBU5uJv5KZuKnkUywc8+JyeC4MjhHS178qfsqW3EwOdd+/JW3BnksaTqan5/ZLyS/E38f+M1NSfgS8Zqjv9fpRAYszgHcf8mn7IyWdUu/NfwITHDYMGpt60HyC50eqxdLwtQdqNP9Q+4KEgNNYoNszhU2sKVJ66+ifQ4AJc7mGedTU/7ikeJtLXkCvGABQX1BNOVmlGjMZYU8CGTTKGiw1IrpXrQ17qzYJh4LMzhd11RzFo6FCrYvzvppXZvYfRelYcaMHYJPQp4O2YcwGtAm8sxL3xOSCnMddDDWsZmvxuJy5RbQUub6dNRuU0gNWd4lhoL3bVNQR11HmqX7XYVlbDe0fC8g7WeBc+LQPFW6XxQxH9AL9ylXtbHAhV3zsp3DgfosnkDWCbDMHaYbCRWoB8xWiNiYeGCwoifZmK10Jo/wgU7HT5FMMRaMtl0RSo8+S2VmI1GSTqLj+GrqVw85bBUWjikn2sOmogIPZUjEBxmissxELWHsqo9+Z6m3bOqGTrJZAz4snLQKXS/EW1aUUOxRJuBN1bpCmRUtjaK04I8lqL0FbOgONA4sxMIgo9CYs2ym9ossxZWYtkfJT1BqgI6hhuuqshAffzFYlaxLRQVZVKxlAXbigHQmt/IFRAqRrrEdR9fumCdy8HMaUsfvX5VXoMtwQh/60HlRUrDIdXit6X7K5TBoxjdbW87qPK/C/EjMMiXcTzJPUk1H5yQM/GzRCd7Af0gj5n1XTIgbX8/NkJInO87nMTe+ht/xUlsqywQYNGE70a0eFSP+QHgk3tK8NfRupGVvepHoK+YVkiAsA/yivd5Nh5mvgqlPurGFT8G/al/UFMgS0CQIJMUEaNNPI7L0rDXnIAdRZVb2akRcu6HxFf2VhkI4DnDr8ksthWhi+YDCMxA7ofEcUglpAa553cwEtH9QCImMPZFFHsDxsCKivNI5zCgyzAQOQc5vyNFh4RjJ5df6dyM0xxcWCnMfniq/7TzgfEZAr+kud0Jsw+FD5prIyrIDHuPDWpNSSAAOZ7VXn8ecL4z43+J1gdmizR/pF/FGKsTkaTpF19ncRcwhj7Ftj1FvPY15BPpzFdsyosOYzgOHxC3UjkULOxnVs49iahUjLw5eTj9RfYc7XdcvmQDchedMxKK0fGVv+av3uqO6IPjL7NTVWqvxrPqEtg4042IR8mcwqUEqCo0TGJZDxDUIh7EPlRQGLHtoU89nn2S2YlzqEZ7POvTqmYY7GkyOND4m3hRk6OIIaeFWKTLR0ypzDdUFmoUxmBcpdEYaq3hCO2E+8WKDKViWigNVds8PX6LhwXcFhJt5rBHuAyxe9tBatuunEfXsrNOMoR5fX6IL2ehBgqa3oKcuXidT2Tibl9CN2nzuueTtnTBUitzvDfn/AH+6n9mof/UJOgJP2Ph9UXNymeCHjb0poh8CdkDnHx60SvA/o5xWYyjrqf8A2Nm+QNacgq3KM95EAyglwp4GgI68NPJNHyz47wB3cdm1vc6Vpy5lHQ/dwGlrLnVzzud/C2g81lKkZqwhz2wWEmmal+nSu5QchEcDU73SqLNOjP14Gmw59T6p7KwrXQM2WGSnQRdSzD2FUb2jxR0EMbDdle91a2NGt1sbXJA80on/AGsmQ1rWllS27snFXpfL6J4xbEckgz2/xMWgMPxcT6bNHwt8T6DqqjBsFw95e4l5LnOOZxJqSeqM9zaypVKhNuzcpGLX20OyPnQLHmPz5oOSgEu7I2aGg5BKvkaT/EALFE5imeoXFWIm4Iun8g6gVfh6p7JGywrGppRCxG0K6hvK3FYsLVAcWMLrrBDR6DmLORWFmj0WsATyP8QGhQ8f4EZOirQhHirCoyLw2VmM3iKjdDCKmId1wIasmqOeSfZ0DZQsU/uFta0DrMSKeTZVwrp8/uhyp5Z1DpuPv9EHo6EXfCncLaDiOg/Py6ckhrgDelGaa6Vt4EpZggyta79RHD2GvrbwKax4TWgOcbMFt6vcNhudPJcp1x0CyDCJeID/AIiB4E+egVeJq7I3d/ypc+ND2CsESjIAbe/Eam/QE/mhSJjMjw541Bdl6WA7C4KEsoI3mp1sJjWCpJu6nDmOtT0Venp4kX02aNPHmoMUnXl3EMpP6d+ld/zQbLHvJd0FUYx/YrkOMBeS+/6h+fIq5wWWVLwAUc0/lyB9VdTEACD2ZaKP7YMc6Mymgb5XKSzLTVpJBttXyNdFacal3PdmAqElfJOPFTQ3OyrGWCco5E8oKuHMn+ybQzU03/LKASxYQ5urCHDwNQrDIwWe9ZFYOHM1+Wu4oXs7i9OhHgZP0ywcwYQYyp/udgl0yaq/4hhDJhjnsID6lzSNHdHDbl0KoMwwglrhQioIOoKMY0SlKwCIoSinsUTmqgpGzVOpE1SgNTXDysBjFhoVO51QhYoRcvSiyEkJJ80cjcLh1cChcVZey7w+YykAphS1zTOAINvwlGOfmZVBw9FGei8NgP8ABlxsFPDwk7pzJwxlqkuI4xkdSimk6LtpeE38oCxKf5+eRW0aB2KwG9F0yv8Ab7LFJLjiF979hc+iuQL7gbbNcaUaA1tN+FuY9q/MKeYjF72sbUkAuoL3Othyt6qPDoTnZGMFXOa0NbtpmJPIXJJ5ArqWb/DTZa51i3Jm2INwa8q+i5qt/R1dqX2CR5ppdxfCwZj1oN/L/aVmDwXR4xe6goCTXRgGhOxPpWqr0d7g4tNqEhw6s1HmAmzMQ9zLnLq8itd+leVvVBqlQ12zvFJSEC54u4khgOpO73fLp4BJ4mH5WF1RfU186eFV1MzByipJc42HM7n6eCLisLgyHpQVceQpxHqdQEyEkS4LIF5F6WBFty63mBUdFaW4XUUc/Tk2nzK5wyVDGsFKEuBI5NY05R4WHiE4DFRcaeWRlyNPAuh4Ywa1d3NvIKLEsODm2AAGwtRN6LC2oVFBJE3NvZ5rPSJaactD9D0QTHFtQNK1I5EaHobm69CxHDQ5VSfwdzSS3yUpRaLRmmbwvFnsNWmu5HOmtRz6i/dH47KtmIf8TCbRzf8AyN379bEGu4KWSOGva9paeLMKNvehB8qVV1wrD8kOjrk5QRsAG5QPRNBPQnK1v08tcFuFLFxTz2hwj3MSw4H3Z05tQcvYpngVZCJTCm0qQp3ygboiZaO2lyo5qZboCgmBnAZZRPfTREh1WoN2qYnfgNNNqh2WIRsVlQhHtomAWuUNYfgoYe67ww8HgomG5UpFo7GkgeEqrY3D41Z8POoSL2gZxV6pFouyv+7WIjKsQti0JyFPKMue3MDl0WmtVh9j8PEaahsIqwHO8c2svQ9Cco8VcjZdPZeXLHwxFGR0WCCxxseHVtDo4toaHSncIj2mwIv4m6ivfr3/ALqyYrKsiNGYXaQ5pFiCLihGiFgxC4Fp+Lr02QUVVB7tSs8uxDCHOObOA9o1500J5HvrRC+7oAHtFQbAGtSeXL8pvS7PkWl7yRxOOvKnJV/EJR0GJny1YRTlQ7H5+hUpQayXjOLdCuRlnPeHuGlgPzQKxyMoGnM6510/PJVKZmHseXAPbsBaltKJxhmKRX0AYXOJpnIJDeZAHLstHZpfRc5KHfMdT6DkmQYhZFlhzoPwpkxi6EczBTDWNhossXOVYUHfCqErm5PonwYtPhVWDZWZaUDX13/N05pZdRJNdsh0WSozdi3EMPbGhljvA7tI0K87mZZ7HuY8Uc00P3HRenPOXMOWnj+9Uh9pcOzsEUfEz4urT9ksliwxeaKPQrW6PdBUfugpRlbKSVIKl/hWZLqWWYoZ0ZUzdCxipMjjuACXRIgqsiRqoR7igpSK9YxLlhT6s8Fx+oqHAncKmifGj4Tew/DzcpX7RN3R8m+jkH7RaJEWZXli1VYsAXMV+/8AzSHxxX0uGsAP+V2cmnSrG+SoMMEkAAkk0AFySdABzXoXsJCjOgx6Ocx7CwMDhanGS0gj4Sa9lY55aL5DiZjQoCeYWuzDb8KW4VjlXhsVuR4dlJ25EU2VgnWXQUk8oRMUTkDMMzdxt6KCMxj+F4aR1dSp5WRkMAOyO+E/D3PNSRZUNuGi3TRJKMpO08BzZU3YUGkscCOg0I2IB0TPD5fLbZOXy7Yg6jRcsgZU6ilkdybCZeEi2sUEu5GMCcUgdEaDQm6H99x5QNlvEZWvENeagicADzyoaKblJP6FbdhwC2FHLPztzBSHVOnasJuizIsBW6omBJmXqEM2G0gsd+oEEd0xeUujs4giY89n4Rhvew/pJHhsfJAZ7qx+2cCkVrx+ttD3b+x9FV2m65+vWRa+0RrK6Lqbg1XMmEXMssqUTToSmUHJROhtFkfFFkhmycxugGyz4S8UUkx8aVez700nPiWMES3xBQY8OFdwH3C7xuHVlVNLJ0eFXqsUN1iNCixpV/kcTfSHMMPEQA8Vsf8AE09KgjyVChtqrJ7OPs+GeQePkf8A5R5li14c0y140xrw2YZo+gf0O1eu3kmcpij3Q21oS0UzG5NNCeuyR4TGDmuguDnB7mnhFcvM9NB5K3YXIw2sIDbtI1NbHfvUFSinJ3HH7Ey8oRxxHeQWZnc6jhAT6RmM4yvHFS9LivNGtYgpmAWOD2fnQq8YOObDGNemntLHV2RrKPFRquIbmxG/lQUIHuhuodPy6oOGFlFNCesY4PFRqtAIGCRQqKNLNcC0rGPUzXINWYUuY+DZgzN5bhdvjZ2EgUPLdNCofcm+iFAoX4Y8ltDqEdFFEoiwIjX1abVrRMg8ub1oiv0wIjhuqFHHZavJDyJcHuadNkT74FxZuipYCJPauTDoJc7Vgq3616UXnzG1cvUMSy5MrhWtiOioWL4WZd4cOJj/AIXcv8ruqWW7DeKNQLI6KeFKIEWpCcZKtWYkbrIqiuSWbhku0Vi9zWtEtmmHNQNJPIA17oFDjBWlpunE9sjML9nxTM51y2oA5oXEIRaLhZNMykmcQ3aJpONrD8Enhusm4dWH4Kfp0LRUnQ7lYiXsue5WI2YrkuU3wSNljs5P/wCmf67A/wCrKV1MezUVoJY5rwBUj4T62UXs+8CMC62Vr3V1oQ00J7a26Ju0ZRbWTjbTyi4YURCeHPdQAOqBUmp0r0AVqwieY9xDXg1aelxcW8ClUlCgPhsjUzZtfiGlWkgdS0nxTSTDKtqwAGhFhcG1wOhScUZJVaBFNDSG8HdSlgNiEA3D2NdmAuDa5oOwTBjqq0W/RwJ0qWHM3TdTODXtoddijCbJFMOMKJrwuPkfsi8BNMiuguyu+Emx5fsmzXB4qNdxzS7EGe8YSNW37gIXD5stoOSGjDqq22ItWcKjXcfVDl6JhhDfVTgpWx+6JZEqKbrGI5w0u26hpkbVBxIzmuIKnhRKihSqVvItmQC5xrSyhyhkStdUWSctkFNPDSK3NVm0jHU3CaXguNiupmQZEhljgC2/7ELHNzgE+CiMJzng5iGk6BFYMee4phL5aLR12O+B3PoeqNZFq1XfH8LZFh5XdwdwdivPIEs/M9hIqw0PVZqgjv2dmG5yxwrXQp5MYYHnPDIa4b0qCDqCkHs6Xl3uyGgA1zbq1S5ylza3ooyf5YEewGWOZ+Ufp1Sr2pm2O4WaCxPZc47jHu3e7Z8WhdokjiSw1RjH0eMTiGbJvKmrEkgGyb4e7hIWfyOmOhW9lz3KxEPbc9ysRCf/2Q=="
            />
          </div>

          <div style={{ marginTop: 9, marginLeft: 10 }}>
            <h3 style={{ fontWeight: 600, fontSize: 13, marginBottom: 0, color: 'black' }}>
              Ribi Sachi
            </h3>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h5 style={{ margin: 0, marginRight: 4, fontSize: 12 }}>36m</h5>
              <FontAwesomeIcon icon={faGlobeAmericas} />
            </div>
          </div>
        </div>
        <div style={{ margin: 16 }}>
          <Paragraph
            ellipsis={ellipsis ? { rows: 2, expandable: true, symbol: 'more' } : false}
            style={{ fontSize: 14 }}
          >
            Ant Design, a design language for background applications, is refined by Ant UED Team.
            Ant Design, a design language for background applications, is refined by Ant UED Team.
            Ant Design, a design language for background applications, is refined by Ant UED Team.
            Ant Design, a design language for background applications, is refined by Ant UED Team.
            Ant Design, a design language for background applications, is refined by Ant UED Team.
            Ant Design, a design language for background applications, is refined by Ant UED Team.
          </Paragraph>
          <Image.PreviewGroup>
            <Image
              style={{ aspectRatio: 1 / 1 }}
              src={
                'https://scontent.fhan2-1.fna.fbcdn.net/v/t1.6435-9/67906894_2517475325139482_4944660539235106816_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=174925&_nc_ohc=2Is_rYUKT1QAX8uwfn0&_nc_ht=scontent.fhan2-1.fna&oh=c94d7944bcc6891ac334a1ed3e752e3f&oe=6099D45D'
              }
            ></Image>
          </Image.PreviewGroup>
        </div>
      </Card>
      <Image
        style={{ display: 'none' }}
        src={
          'https://scontent.fhan2-1.fna.fbcdn.net/v/t1.6435-9/67906894_2517475325139482_4944660539235106816_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=174925&_nc_ohc=2Is_rYUKT1QAX8uwfn0&_nc_ht=scontent.fhan2-1.fna&oh=c94d7944bcc6891ac334a1ed3e752e3f&oe=6099D45D'
        }
        onLoad={() => setLoading(false)}
      ></Image>
    </LazyLoad>
  );
}
