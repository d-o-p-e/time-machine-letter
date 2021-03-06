package crappyUnivLife.timeMachineLetter.repository;

import crappyUnivLife.timeMachineLetter.domain.Letter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class LetterRepository {

    @PersistenceContext
    private final EntityManager em;

    public void save(Letter letter) {
        em.persist(letter);
    }

    public Letter findOne(Long id) {
        return em.find(Letter.class, id);
    }

    public List<Letter> getLetterList(Long memberId) {
        return em.createQuery("select l from Letter l join fetch l.member m where m.Id = :memberId", Letter.class)
                .setParameter("memberId", memberId)
                .getResultList();
    }

    public Optional<Letter> findByHash(String hash) {
        List<Letter> letter = em.createQuery("select l from Letter l where l.hash =:hash", Letter.class)
                .setParameter("hash", hash)
                .getResultList();
        return letter.stream().findAny();
    }

    public List<Letter> getReceiveLetterList(String receiverEmail) {
        return em.createQuery("select l from Letter l where l.letterTo = :receiverEmail", Letter.class)
                .setParameter("receiverEmail", receiverEmail)
                .getResultList();
    }
}
