import { TouchableOpacity } from "react-native";
import { HStack, Heading, Icon, Text, VStack, Image, Box } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { AppRoutesNavigationProps } from "@routes/app.routes";
import { ExerciseRouteParamsProps } from "src/types/Home";

import { Button } from "@components/Button";

import BodySVG from "@assets/body.svg";
import SeriesSVG from "@assets/series.svg";
import RepetitionsSVG from "@assets/repetitions.svg";

export function Exercise() {
  const navigation = useNavigation<AppRoutesNavigationProps>();
  const route = useRoute();
  const { exercise, group, repetitions, series } =
    route.params as ExerciseRouteParamsProps;

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>
        <HStack
          alignItems="center"
          justifyContent="space-between"
          mt={4}
          mb={8}
        >
          <Heading flexShrink={1} color="gray.100" fontSize="lg">
            {exercise || ""}
          </Heading>

          <HStack alignItems="center">
            <BodySVG />
            <Text color="gray.200" ml={1} textTransform="capitalize">
              {group || ""}
            </Text>
          </HStack>
        </HStack>
      </VStack>
      <VStack p={8}>
        <Image
          w="full"
          h={80}
          source={{
            uri: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBISEhISEhIYEhIYEhkfDxgYDx8SEhAVJSEnJyUhJCQpLjwzKSw4LSQkNDo0ODM0Nzc3KDE8Skg1WTxCNz8BDAwMEA8QGBESGT8dGB4xMT8xMTUxNDg6MTE1Pz8/MTExMTwxNDE0PzE3PUAxPTE0ODQxMT80ND8xMTExNDExMf/AABEIAKoA5gMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAFAQIDBAYAB//EADwQAAIBAgQEBAQEBQIGAwAAAAECAAMRBBIhMQVBUWETInGBBpGhwTJCsfAUI1Jy4WKCB0OSotHxJFOD/8QAGQEAAwEBAQAAAAAAAAAAAAAAAQIDAAQF/8QAJhEAAgIDAAIBBAIDAAAAAAAAAAECEQMSITFBUQQTIjJhcRQjQv/aAAwDAQACEQMRAD8AxNNLiI9PtC3E661q9SogZUNgga1woFhtK4SczdM6EuAapStIXS8L16UH1UIjRlYko0UWUr6RyAHT5GTuLytTuG01HSUFHo+Xyt7GPq1DYLYWOa/l126xlZb6dpyl8i2JK5vPbbteaPkwdwTrkog6nxEIHcATZ8TxQUtTNgHpjOS1vK+YfqB855xhapz06l9l5nYgW+0NcQxi1nw9cOH8OigqBhcMxDNr3uLSGWG07OtZf9aXwFf+GeNZ8di2ewZsOAbbeVgPtPS69e4nkX/Dip/86qf6qNQ9Pzgz0HifEkordjck2UA6sf3zkc6e1IXH+tmN+OcJc5+4mExSWA9ZsuN8bFa6EDIW0I0YW9Zm8bhyw0FrHQ3uCPWXw3FJMnkp9RSwuTNT8QE0865wv4ivO0bxMqarFFKIWORSblVvoCY5GyFCy3sbkGR4lTdcws17+x1ll5IvwWEWyfvrEdPKlgSS55dpMlIlRYE36SYUagUAXVtTe9raQX0arBfhsxsNtLy6BJaFFUBZ7sT+EDS8lfKuUFRf8xvM3YFGiBRHKsmpOlibahhodrf+56vwTC4GrhqdUYakMyeceGDlcaEa95OUtS8Mex5IRGOJ7VT4VgzthqY//IQfxb4ewdRHAopTa2joMhQ8r9ZNZl8Dv6eR47XYgaC55Si9R9bkiFcQmWoVJBsSLjY6yCooJA9Z0Rkcsos22GS1GkOYpJ+krVaV4UWn5EHRQPpInpSS8lX4BRpzoQamJ0cmUClo/KN5KKfKcE5SNl6K1QSjXQa669OsJVXQGxdQehbWVa1Ngpe6lb89G17wxFkDqFEM4ViQNcxUXI0gvEPl1G94X4etXxx/MCLr5wRdbggC3O+0H8QKK7IRqCQCBp8paL6RkuEOGqsx836SXE0yBa4GWxPmtf06xMDSuygEG5AGto/iRBepfSzWGm9o19oFcso3Ayn2sIX/AIWs9KiSoSjmOVyNWsSwOnyguki3pgkgEb9Dea/irkU6NAqUJ8V1sbLY6LFm6aSGirTKXwBVtjb9aT/Yy18WcTFavkQnIi2vtrfWCMKWw+IFQ/hdGKNlvmQ6E29ZBiQSEcbMovcaQOKcrGUqjRLhnKOSV8RbeUnZTCuGQtYuLJ0I0Jmad7W1O+m8LYTGNkNzc20vsIZR9mg/RFicKXqLTyEXfynKf2Yc+IfhFsMq1japTNgWUFch5XH3mh4VVqGpTqN/MpuosujhXtyPK0O8Qr06tCrTJUK1Ngc2g2kJZZKSSOz/AB46/NnktXFlBZAALcpFSxea4bXT1lRyRqBcfmH3laoSDcbHYidMUmcMm0wg9XOb6gd42s/eUqVW3ry10impDqLsWKdU2Yf6fuJv/hDHsuDtfQVH+xnmoq2v3hvhWObw/DFTLdiSL7kyeWFxpF8OVRas9EwfHi9QoNEUeZu/SWcfjslCpUJ3BP00mL4IPxf3666wh8S4smmlMHl5h2nJpUqO/wC5+Gxj31N+2srV61QtcgaKACVGgG0tuQrAHp1tFWkr1FU7EgHUcz6ztjw8uXSbAYnFM2YuWpqfOCbe0K/xYFswNr62Qk292l3hvD1pZ6DAN+dG5upNte4k9XAJfRR3hvvAVwEVeIJc5Q1r6Xpa2/6p0ODBU+aD5TprZtUL4AvGvhxeXwgjHpqdxOGzsoG1cKpUmy36lQbykUORQBrnO3Yf5h2pTUKTYQNXNsv9pJ9zKRdiSRWwNMmpcgWBJ+QvM7xTCuWD5bhr7dZqme9JnAtemeWuptB2PUBaY28pPzMrB0yUo2ijwfCnPTzDYlmv2kOIo3WozAjzX6a3h3hqeWo/SmfrKXFPLRcZb6C8e7kJVRBGHpr5c7AKoYHW5a/TpaW+LcX8R6L3uUoBH9Qd/wBIEzm1r2ETObWvH17bFvlInTFMGJ3FiLHa0svjARYC4K2YHW0qYOgajrTUZmZrKL7maGl8M1CNaYBHRxBKUV5NFSfgGYJCzAH8JOo3mj4e9Cj5LLVdj57gMEHTtKC/D1emCwARfzHxIRxzChgytRENQECmy79ie8lKUZOkzqxfj1os47iAoMrU/Ldfw8vlAuN+JPO4Q5swI/tPaDa3EnK2Ziwtzt8h0gk73jRwr2Lk+of/ACXabxKtG4JX3EqBj1i5veW1OZys4qYjCLFUaxhRpiq5Gne4iMJb4VgzWrIgIFzc3NtBFfixopt0bbg+FFKgrufMRex39YGxfEgajFtRtfmBDHGqpp0iTpZQqf6jsJinqaEHcm7H9JzY4bNyZ3Z56xUUE8cFL3DaZARbYyDh7g4ikoP/ADFv8/SUlc2A7wnwTDDxqTf6xz3lqpHH5NKmJH8QHKsHaoyWKHKKVtNdtxf3hN6to4SJrdIqGY5XBiRm20SEARWcydJIE2iFd5wnYUcVh3yHzwViaWVHtqRZdew1hrE5tBY2NtZnsdXqXIBRVZiVJIvv6ysbElRdqIBRCgWJyg/rA/Gk8/ZUUfSW69WoadO9QMxqHJkF7gWFoM4hj1ckOMpzG9t/SUimiUmmFMGR/DueoQD5/wCJDxBP5FS2+U20ld8YKeFpvY5WrWHcAf5lbEcWV1KgMLggXtHSfkm2vBF8N06bhs6qxzG1xfS02OD4dQKKWood/wDljrMxw3h1ShTFRwCpYOLN57AbTUUuL4YUVfObWOyGTyvb9WWxwcf2Rk+IpTpcSTKFpoKiHQZVXTWbJMTT38RSOVmvPO+IYkVcSH1ILKDcWvNZhkAWwsNTFzJ6xsOF3JpBDiOIVqNTIb7X+cC/Erg4S3R1jOK4qrTCoh8rA5wFBv7yhxbEZsOy63zqdpOEXcX/ACPJqmgEwIHYiRWE9Ww/w1hFw9HxKAep4a+IxZrlrXPOY74i4Oi1EFEBRUJAX+kj7TsjmTdEJYJRVmZnWk3gE3KkG1tNib9JG9FwASpAOxtoZW0yFMaTFWJL/CAM+ckApYpcXDMCLCaTpWZK3RT8NzspP+0z0X4b+DENEVKjHOdQQR5OwhfD/FHDgCrU77bUlGvPnIeFfE+HpU2psSVzHJlXQIToD3AnLklJqkqOzBCCbb6Zr4m4JiKQpoHNVGc5EG4a1+fa8z9bhVemC9SmyqBrcg2Hzmu+K/iOg4oikGZ0rq4Y+WwU6/OLxL4xp1KZQUFHlYG7HmI0HJRVoGdRcnTMMjagadtdBCfw6S+Lpgaqmb52MD20mj+FsPlxCrzFNy+nMgaewP1lWc6NeToZGZK4kQEQYjM6NqtYxIQFV+PVzsETS+i3t85Tr8XrbtVYenlgsmod2MQ0L76yKjFFNmy7QxLNUpu9Q5Q1yWfyytWpozAmspPPIjOfoJCMKg/KIpQj8LMoO4BtG56B32HqeHqIuHcU2ZApZCWWkCSedzB7YamCTUfDqSSTmrNVN/RRKPgqbEgse7FoosNgB6CYwQxNXDMtOmQ9RFBIy0siljuRc6QZUpUrHLhzbXU1vN9JKDpEdgAdbnpCm0Z0D8Vxmo6KhY6C19pTNdrAXuLW3k1BcjklA6ncHlLtqB3p5fYyn4r0K5Sl5YLRSGU9wfrNAnGQra3I1vaynbvBNalYsKa8tBubdY1sKSNA1uek0lGVWLGUo3Ro8TxhK6ranTpkWvlTKze5MgqIKhp01IZmqIAAbk+bWBWwoRQSwN+X9PqJoPgREOKRijZkVipJunT7ycoqKtFINykkzf1nDISOQnnHxFiV8VGuSUuFHeenVKCIS3I7ryvPGeLPmr1dSR4jW9LxMKTZfO2o/wBk+PxlNguVQDpcqLRuJxQKCmBlW9wTr84OsORPvHMxNr7dZ06o4rYU4Xh6T03WpTu/iaPmIYLbYD6yLH4ZKNmpkkncHWWODJdH/v8AtG8apnIp6NaT2e1DpfjYJOIfrGis9rZjb1jCIktSJ2xwY9ZNeQLJlBmaAhRt+kOfDuINMvUAGa2VbjZdz8zAono3w3wnBYvBoisaWMRD4ticzG/4ip0YbbWIiSdIeKbfAc3G35op+Yki8WvvT+TQNj8PUoVHp1GQFTvfRhyI7GVv49V/Pf0QwKhna8h6vxNRa6E/7p0zVXiaE/hc+4E6GhbL9otvWKq3kgpTmLkJvGkSx4M7wobBRWCHpONMy0Ejihms1FNaM40ZcCe8cqDpNsageaPaKKXaERTHX6Rwoe/pNsbUGpgb/nYfI/rErcJJ1FQg/wBtv0hXw+0QpBsw6ICtRrLowFQciDZxDfwlda7FkyDJ5fNfnInSXOC0z4hPQfeaUrQ+OP5I1HG8d4dFmH4gptPKVpOGzMhYnezTc/EeKBUUxsdT6TN+1psb1Q2frSBZAvrTI/23i4rJl8qANpbSxhILrHsJTbpz6lPhCnKwsfxX20k/EaTGm3bWWEYiOdgQVIBBGsDl2wqPKMm4nU6TNsNOs1WG4XhypYoSQNMz3EF4phmAGljpYbSv3L8C/Za63wPcV+EqdHBtVSrmqIqsy5fxdRftf6THqZp243mGSo3kK2fXlaZ2lhHc2QZxfQ3tcRcTkk9mHLGNpxOw1RVdWdM6A3dc+TMOl+Ulw/EalKotamxR1fMttB6enKXMJwhvEC1Q3IhQPx9rzvibCCniCAhVSiFANgLW+0beLdC6SUdjS4yph+LUx4TeDjEF8jCy1l5qp525TIvgCpIYkEGzA6EGQ0MNVJDJ5CDdTmylT1hnE1zUcu1s5Vc9ju1tT7wPnhm/brXQR/DCdCBQTptgaovoJOik7CV0NthJQ3eQLk4Qcz8tYth0v6mRq0deYIpETLH3EeDFMVykUJLISdlhsNESLJAJIqHp7nSKEHUmLZqGE6W+8aT6R5HtGFITDGy9PrDnwnwh8T47oygoVCqxsahIuQPTT5yPheApGm1WqCQMx3soUbkx/EeMYSjRplUZHdQaSKLOqnmZk/VWOotLa6A3GEZKtRKjKrq1mXP+G0GGovK59pFh81QsW1a92JH4paGGtyJ/2mPrRKUtnZCNeUeU6kCcyEciPXSUcRVA/OPneFRbEbSCDvQawVzSfln1Rj/cNpSxa1KZ8wsD+Fh5kYdjB2JrZgRe/tYR+AxtRFNNmJp/0337SixsVzQ04+opYA3vKjs5Oul+ul5NUrkklQFEjqI5/EeWl46jQspX7Eo0kJ/mNl+phDh1elTqKAzEX9IPFHMbX1t0hOhwumursxPQEWglXtmhd3Ru+HOvlawFtje8fxvhpxCMUOWqo/lt17HtMxgMQKbZTfIdrtcqZuMFXVlBG1pxyuLtHpwcZxpo8mqJWLFWzZgbEHkZaweGNO5bc9DNX8TYUBvEUWzGz+vIzPkS8cm0Tini1lQw+86KROhFosCSiVkf5SZHiDEoMesaDHrTO509YAoeLxyr0iC3rHZz7TBJApHW3PTWSK55C36yAH2jgxi0GyXMCd7x15Bmvpt9YlttfrNRrJmI9YwiN12iK3mAJsCbEnl3mNZJX4i9OiyaNTCnMmX8ancXmVr1GU3GbKQPCLnMypyF5q6ppq7KUd6d/KwcAsOuUiVcZwlalSn/AArOVAGYFcrrbmBK4mk6ZPLJtLpnkxtc6Kzn0krHFMNQ4Hdz/wCZpMfUWmD/AC7NfQAHbvaBa/EqmgSmliDe6XP6yjfeImlzrBy4d3NmqAdzc/WXsPwuna71M2nJwBflOp8WsAtSnYgAXGh+UujiVOooQZd+aAE+pMLYEirWwCUwaiGxC2tYEeusm4fgaddDUqU7HNlUgaac/tLGPQVLUaBFRiAXIPkTrc9JOGamq0qSZsotcqVV256zKVrhtelVeG4dfETxDRrCxo56QejVW2oLbg94Kx+DdSSU5XuCLKvX0hx62INiKanTn153ipVcEGpTTQG2o3tppAvIzSoAYY02AABzqd818/TSHOCcMr4sOVoMoRgrsGATN0F5SxaAZXABIOvcd7Qng+P10UZGyC2yjLBO2jRSTIeI8GrUriohAGzAZ1+m0t8Dx5y5Sdt5ocBxdalNUxCup/rW+Y+sE/EPDloMmIpOr020qBVylTyYiQfeM6YPV2hOKNnpsN9LiZkmaLNmW4N7wDVuGIOtidxNj5aH+o6lIhIvOj7jp8jOlTlIkuZMhHM3PQbSsCeZ/wASRIGjItpU6SZHlVZMrRKGssr+7Rw/feRIZKrja+swR4HvHEfWRXEeH11mMcVnFY5X/wAxC3OKERjp2iA/vlFd5Cxtzho1hDAVqCrUFamXun8qzEZH6wrwXChW8UfkpG/cmZgPqB3mtwLZaFUnsBKQXsnJ+iHA8UWnnXOoJY5gyg3+cvLi8PU/HRw9TrdAD9Jha1Ulm1/MZGCO4PaHZfBqZuMRRwJGmCQHs5tKHh4QHTCIPWZZ8w/P/wB1pA9cDqYPITZjFUkUqlNEBIuAbXIlZ8ZTvcqnubzEvjOlv1lSpiyecZRA5HoDcYQf/UOmglPFcZpkHzUr/wBqzBs5MaqX3jaIXdmubjKajxE1HJRKNLjbqSPE0/tgIUx0j7Wh1QuzN1gviLC+GoqVaqVBfNlp5sx7dpV4t8TUCQtPPUpmmA4dLZm5zJK8fYesVRSY27qjTcHxIenobgHS8bWAaoQ72NvID5Rb1g3g2Kp0ms5Kgne1wPWFviCiUp06iFHRjlYHzA31Ug8uck1Uv7OnbbF/KK1TCEdvUToKfjDBQtMlACbj8R+fSdH1kQ2ROojhEUe8eLGYCJUjkMiDddBHId/tAEmUnlpHgyBTvYXH1jgecUNlhKl7/KKDf7Suregj1f2+81BLIb9944GVQ/7vHZ/W94KNZPcekgdh78oqv6e84W9+p3MxheH0A1S7GwVgQvM+s0+MbJhz0JJmQZyrB1N/6gPtJ8TxkPTyFgVtoM1vpKRbQroGtiD0+t5E+K5X+UiN6jHLoO2kd4SLvqYaQLZA9ZzoP/MYUdtzeWc4GwjGcnsO0KFK5wxvY6e8cuFtzBPSTqQBt9Iqnt6Q2wUVSlt10nachaXlH67COFJTus2waB5EVaN9gYUXDpy0PfaL/DnkL+hg2DQN/hTbeJksDYct4Vw2CNQuiuiVAhNNGJDYi26qds3bnBTVACQxKnmCMp9CIV0DVEa0ydSSW/STmvU8PwywNPMCovz7TqbeIRTRS7k2VVGZiZseC4zBYBCairWxX58iCo1P/TmOgPpM2GK+GZrFcOellWqmQlFYA6XDC99f2IkKcc442Kq+KyimoULTXNchd9e8SJ0akDtel/eOU6SNfze0XrMAkF/X9JKRblI6e/tJW5+ogYUKp6D/ADE0vHH7iIN/cwGOO/26RM8UfeNG8JhQfnOzxE2PoZyb+xmMSBup/wAxGfURlWdVgoxI5Fv2JXyBrED1Mc3L0P6RycvWFBZWKWvaNcDlJG/F8oi8/SEU4KOY9pE56e2kkO/sIr/gPqIQFdhf1/SS9j7Gc2495y7/ADmMKq6+8kF+lzHjl6GMq8vSAYRjbWNFcSCp940b+0KQCevWDCx1F9L/AGl7B8fr0wFFQuo2FSmle3/UL/WCR9o47n0hAF8Tx/E1FKioiBhZhTopQZh3IF/rB607AAjbXtKycvSTqxsNTv17wPgRS06S4jeJAY//2Q==",
          }}
          alt={exercise || "Nome"}
          mb={3}
          resizeMode="cover"
          rounded="lg"
        />

        <Box bg="gray.600" rounded="md" pb={4} px={4}>
          <HStack
            alignItems="center"
            justifyContent="space-around"
            mb={6}
            mt={5}
          >
            <HStack>
              <SeriesSVG />
              <Text color="gray.200" ml={2}>
                {series} Séries
              </Text>
            </HStack>

            <HStack>
              <RepetitionsSVG />
              <Text color="gray.200" ml={1}>
                {repetitions} Repetições
              </Text>
            </HStack>
          </HStack>

          <Button title="Marcar como realizado" />
        </Box>
      </VStack>
    </VStack>
  );
}
