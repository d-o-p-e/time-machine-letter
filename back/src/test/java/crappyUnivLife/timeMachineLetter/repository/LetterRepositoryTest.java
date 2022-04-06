package crappyUnivLife.timeMachineLetter.repository;

import crappyUnivLife.timeMachineLetter.domain.Letter;
import crappyUnivLife.timeMachineLetter.domain.Member;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
@Rollback(false) //직접 데이터 보고싶을때
public class LetterRepositoryTest {

    @Autowired EntityManager em;
    @Autowired LetterRepository letterRepository;
    @Autowired MemberRepository memberRepository;


    @Test
    void 편지작성() {
        //given
        Member member = new Member("woojin8787@naver.com", "jinuCheon");
        memberRepository.save(member);


        Letter letter = new Letter();
//        letter.setId(100L);
        letter.setPassword("1234");
        letter.setTitle("제목");
        letter.setContent("내용");
        letter.setMember(member);

        //when
        letterRepository.save(letter);

        //then
        System.out.println("%%%here :" + letterRepository.findOne(2L));
        assertEquals(letter, letterRepository.findOne(2L));
    }
}
