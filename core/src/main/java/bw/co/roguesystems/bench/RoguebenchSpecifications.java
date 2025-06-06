package bw.co.roguesystems.bench;

import java.util.Collection;

import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.CriteriaBuilder.In;
import jakarta.persistence.criteria.Path;

public class RoguebenchSpecifications {

    public static <E, T>Specification<E> findByAttributeLikeIgnoreCase(String attributeValue, String... joinAttributes) {

        if(joinAttributes.length == 1) {
            return (root, cq, cb) -> {
                return cb.like(cb.upper(root.get(joinAttributes[0])), "%" + attributeValue.toUpperCase() + "%");
            };
        }
        
        if(joinAttributes.length > 1) {

            int len = joinAttributes.length;

            return (root, cq, cb) -> {

                String first = joinAttributes[0];
    
                Path<?> p = root.get(first);

                for(int i = 1; i < len-1; i++) {
                    p = p.get(joinAttributes[i]);
                }
                return cb.like(cb.upper(p.get(joinAttributes[len-1])), "%" + attributeValue.toUpperCase() + "%");
            };
        } else {
            return null;
        }
    }
    
    public static <E, T>Specification<E> findByAttributeContainingIgnoreCase(String attributeValue, String... joinAttributes) {

        if(joinAttributes.length == 1) {
            return (root, cq, cb) -> {
                return cb.like(cb.upper(root.get(joinAttributes[0])), "%" + attributeValue.toUpperCase() + "%");
            };
        }
        
        if(joinAttributes.length > 1) {

            int len = joinAttributes.length;

            return (root, cq, cb) -> {

                String first = joinAttributes[0];
                Path<?> p = root.get(first);

                for(int i = 1; i < len-1; i++) {
                    p = p.get(joinAttributes[i]);
                }
                return cb.like(cb.upper(p.get(joinAttributes[len-1])), "%" + attributeValue.toUpperCase() + "%");
            };
        } else {
            return null;
        }
    }

    public static <E, T>Specification<E> findByAttributeIgnoreCase(String attributeValue, String... joinAttributes) {

        if(joinAttributes.length == 1) {
            return (root, cq, cb) -> {
                return cb.like(root.get(joinAttributes[0]), "%" + attributeValue + "%");
            };
        }
        
        if(joinAttributes.length > 1) {

            int len = joinAttributes.length;

            return (root, cq, cb) -> {

                String first = joinAttributes[0];
                Path<?> p = root.get(first);

                for(int i = 1; i < len-1; i++) {
                    p = p.get(joinAttributes[i]);
                }
                return cb.like(p.get(joinAttributes[len-1]), "%" + attributeValue + "%");
            };
        } else {
            return null;
        }
    }

    public static <E, T>Specification<E> findByAttributeEquals(T attributeValue, String... joinAttributes) {

        if(joinAttributes.length == 1) {
            return (root, cq, cb) -> {
                return cb.like(root.get(joinAttributes[0]), "%" + attributeValue + "%");
            };
        }
        
        if(joinAttributes.length > 1) {

            int len = joinAttributes.length;

            return (root, cq, cb) -> {

                String first = joinAttributes[0];
                Path<?> p = root.get(first);

                for(int i = 1; i < len-1; i++) {
                    p = p.get(joinAttributes[i]);
                }
                return cb.like(p.get(joinAttributes[len-1]), "%" + attributeValue + "%");
            };
        } else {
            return null;
        }
    }

    public static <E, T>Specification<E> findByAttributeNull(String... joinAttributes) {

        if(joinAttributes.length == 1) {
            return (root, cq, cb) -> {
                return cb.isNull(root.get(joinAttributes[0]));
            };
        }

        if(joinAttributes.length > 1) {

            int len = joinAttributes.length;

            return (root, cq, cb) -> {

                String first = joinAttributes[0];
    
                Path<?> p = root.get(first);

                for(int i = 1; i < len-1; i++) {
                    p = p.get(joinAttributes[i]);
                }
                return cb.isNull(p.get(joinAttributes[len-1]));
            };
        } else {
            return null;
        }
    }

    public static <E, T>Specification<E> findByAttributeNotNull(String... joinAttributes) {

        if(joinAttributes.length == 1) {
            return (root, cq, cb) -> {
                return cb.isNotNull(root.get(joinAttributes[0]));
            };
        }

        if(joinAttributes.length > 1) {

            int len = joinAttributes.length;

            return (root, cq, cb) -> {

                String first = joinAttributes[0];
                Path<?> p = root.get(first);

                for(int i = 1; i < len-1; i++) {
                    p = p.get(joinAttributes[i]);
                }
                return cb.isNotNull(p.get(joinAttributes[len-1]));
            };
        } else {
            return null;
        }
    }

    public static <E, T>Specification<E> findByAttributeFalse(String... joinAttributes) {

        if(joinAttributes.length == 1) {
            return (root, cq, cb) -> {
                return cb.isFalse(root.get(joinAttributes[0]));
            };
        }
        
        if(joinAttributes.length > 1) {

            int len = joinAttributes.length;

            return (root, cq, cb) -> {

                String first = joinAttributes[0];
                Path<?> p = root.get(first);

                for(int i = 1; i < len-1; i++) {
                    p = p.get(joinAttributes[i]);
                }
                return cb.isFalse(p.get(joinAttributes[len-1]));
            };
        } else {
            return null;
        }
    }

    public static <E, T>Specification<E> findByAttributeTrue(String... joinAttributes) {

        if(joinAttributes.length == 1) {
            return (root, cq, cb) -> {
                return cb.isTrue(root.get(joinAttributes[0]));
            };
        }
        
        if(joinAttributes.length > 1) {

            int len = joinAttributes.length;

            return (root, cq, cb) -> {

                String first = joinAttributes[0];
                Path<?> p = root.get(first);

                for(int i = 1; i < len-1; i++) {
                    p = p.get(joinAttributes[i]);
                }
                return cb.isTrue(p.get(joinAttributes[len-1]));
            };
        } else {
            return null;
        }
    }
    public static <E, T>Specification<E> findByAttribute(T attributeValue, String... attribute) {
        
        if(attribute.length == 1) {
            return (root, cq, cb) -> {
                return cb.equal(root.get(attribute[0]), attributeValue);
            };
        }

        if(attribute.length > 1) {

            int len = attribute.length;

            return (root, cq, cb) -> {

                String first = attribute[0];
                Path<?> p = root.get(first);

                for(int i = 1; i < len-1; i++) {
                    p = p.get(attribute[i]);
                }
                return cb.equal(p.get(attribute[len-1]), attributeValue);
            };
        } else {
            return null;
        }
    }

    public static <E, T>Specification<E> findByAttributeNotEqual(T attributeValue, String... attributes) {
        
        if(attributes.length == 1) {
            return (root, cq, cb) -> {
                return cb.notEqual(root.get(attributes[0]), attributeValue);
            };
        }
        
        if(attributes.length > 1) {

            int len = attributes.length;

            return (root, cq, cb) -> {

                String first = attributes[0];
                Path<?> p = root.get(first);

                for(int i = 1; i < len-1; i++) {
                    p = p.get(attributes[i]);
                }
                return cb.notEqual(p.get(attributes[len-1]), attributeValue);
            };
        } else {
            return null;
        }
    }

    public static <E, T>Specification<E> findByAttributeNotMember(T attributeValue, String... attributes) {
        
        if(attributes.length == 1) {
            return (root, cq, cb) -> {
                return cb.isNotMember(attributeValue, root.get(attributes[0]));
            };
        }

        if(attributes.length > 1) {

            int len = attributes.length;
            return (root, cq, cb) -> {

                String first = attributes[0];
                Path<?> p = root.get(first);

                for(int i = 1; i < len-1; i++) {
                    p = p.get(attributes[i]);
                }
                return cb.isNotMember(attributeValue, p.get(attributes[len-1]));
            };
        } else {
            return null;
        }
    }

    public static <E, T>Specification<E> findByAttributeIsMember(T attributeValue, String... attributes) {
        
        if(attributes.length == 1) {
            return (root, cq, cb) -> {
                return cb.isMember(attributeValue, root.get(attributes[0]));
            };
        }
        
        if(attributes.length > 1) {

            int len = attributes.length;
            return (root, cq, cb) -> {

                String first = attributes[0];
                Path<?> p = root.get(first);

                for(int i = 1; i < len-1; i++) {
                    p = p.get(attributes[i]);
                }
                return cb.isMember(attributeValue, p.get(attributes[len-1]));
            };
        } else {
            return null;
        }
    }

    public static <E>Specification<E> findByAttributeIsEmpty(String... attributes) {
        
        if(attributes.length == 1) {
            return (root, cq, cb) -> {
                return cb.isEmpty(root.get(attributes[0]));
            };
        }
        
        if(attributes.length > 1) {

            int len = attributes.length;
            return (root, cq, cb) -> {

                String first = attributes[0];
                Path<?> p = root.get(first);

                for(int i = 1; i < len-1; i++) {
                    p = p.get(attributes[i]);
                }
                return cb.isEmpty(p.get(attributes[len-1]));
            };
        } else {
            return null;
        }
    }

    public static <E>Specification<E> findByAttributeIsNotEmpty(String... attributes) {
        
        if(attributes.length == 1) {
            return (root, cq, cb) -> {
                return cb.isNotEmpty(root.get(attributes[0]));
            };
        }

        if(attributes.length > 1) {

            int len = attributes.length;
            return (root, cq, cb) -> {

                String first = attributes[0];
                Path<?> p = root.get(first);

                for(int i = 1; i < len-1; i++) {
                    p = p.get(attributes[i]);
                }
                return cb.isNotEmpty(p.get(attributes[len-1]));
            };
        } else {
            return null;
        }
    }

    public static <E>Specification<E> findByAttributeStartingWithIgnoreCase(String attributeValue, String... attributes) {
        
        if(attributes.length == 1) {
            return (root, cq, cb) -> {
                return cb.like(cb.upper(root.<String>get(attributes[0])), attributeValue.toUpperCase() + "%");
            };
        }
        
        if(attributes.length > 1) {

            int len = attributes.length;
            return (root, cq, cb) -> {

                String first = attributes[0];
                Path<?> p = root.get(first);

                for(int i = 1; i < len-1; i++) {
                    p = p.get(attributes[i]);
                }
                return cb.like(cb.upper(p.<String>get(attributes[len-1])), attributeValue.toUpperCase() + "%");
            };
        } else {
            return null;
        }
    }
    
    public static <E>Specification<E> findByAttributeEndingWithIgnoreCase(String attributeValue, String... attributes) {
        
        if(attributes.length == 1) {
            return (root, cq, cb) -> {
                return cb.like(cb.upper(root.<String>get(attributes[0])), "%" + attributeValue.toUpperCase());
            };
        }

        if(attributes.length > 1) {

            int len = attributes.length;
            return (root, cq, cb) -> {

                String first = attributes[0];
                Path<?> p = root.get(first);

                for(int i = 1; i < len-1; i++) {
                    p = p.get(attributes[i]);
                }
                return cb.like(cb.upper(p.<String>get(attributes[len-1])), "%" + attributeValue.toUpperCase());
            };
        } else {
            return null;
        }
    }

    public static <E, T extends Comparable<? super T>>Specification<E> findByAttributeLessThan(T attributeValue, String... attributes) {
        
        if(attributes.length == 1) {
            return (root, cq, cb) -> {
                return cb.lessThan(root.<T>get(attributes[0]), attributeValue);
            };
        }
        
        if(attributes.length > 1) {

            int len = attributes.length;
            return (root, cq, cb) -> {

                String first = attributes[0];
                Path<?> p = root.get(first);

                for(int i = 1; i < len-1; i++) {
                    p = p.get(attributes[i]);
                }
                return cb.lessThan(p.<T>get(attributes[len-1]), attributeValue);
            };
        } else {
            return null;
        }
    }
    
    public static <E, T extends Comparable<? super T>>Specification<E> findByAttributeLessThanEqual(T attributeValue, String... attributes) {
        
        if(attributes.length == 1) {
            return (root, cq, cb) -> {
                return cb.lessThanOrEqualTo(root.<T>get(attributes[0]), attributeValue);
            };
        }
        
        if(attributes.length > 1) {

            int len = attributes.length;
            return (root, cq, cb) -> {

                String first = attributes[0];
                Path<?> p = root.get(first);

                for(int i = 1; i < len-1; i++) {
                    p = p.get(attributes[i]);
                }
                return cb.lessThanOrEqualTo(p.<T>get(attributes[len-1]), attributeValue);
            };
        } else {
            return null;
        }
    }
    
    public static <E, T extends Comparable<? super T>>Specification<E> findByAttributeGreaterThan(T attributeValue, String... attributes) {
        
        if(attributes.length == 1) {
            return (root, cq, cb) -> {
                return cb.greaterThan(root.<T>get(attributes[0]), attributeValue);
            };
        }
        
        if(attributes.length > 1) {

            int len = attributes.length;
            return (root, cq, cb) -> {

                String first = attributes[0];
                Path<?> p = root.get(first);

                for(int i = 1; i < len-1; i++) {
                    p = p.get(attributes[i]);
                }
                return cb.greaterThan(p.<T>get(attributes[len-1]), attributeValue);
            };
        } else {
            return null;
        }
    }

    public static <E, T extends Comparable<? super T>>Specification<E> findByAttributeGreaterThanEqual(T attributeValue, String... attributes) {
        
        if(attributes.length == 1) {
            return (root, cq, cb) -> {
                return cb.greaterThanOrEqualTo(root.<T>get(attributes[0]), attributeValue);
            };
        }

        if(attributes.length > 1) {

            int len = attributes.length;
            return (root, cq, cb) -> {

                String first = attributes[0];
                Path<?> p = root.get(first);

                for(int i = 1; i < len-1; i++) {
                    p = p.get(attributes[i]);
                }
                return cb.greaterThanOrEqualTo(p.<T>get(attributes[len-1]), attributeValue);
            };
        } else {
            return null;
        }
    }
    
    public static <E, T extends Comparable<? super T>>Specification<E> findByAttributeBetween(T attributeStart, T attributeEnd, String... attributes) {
        
        if(attributes.length == 1) {
            return (root, cq, cb) -> {
                return cb.between(root.<T>get(attributes[0]), attributeStart, attributeEnd);
            };
        }
        
        if(attributes.length > 1) {

            int len = attributes.length;
            return (root, cq, cb) -> {

                String first = attributes[0];
                Path<?> p = root.get(first);

                for(int i = 1; i < len-1; i++) {
                    p = p.get(attributes[i]);
                }
                return cb.between(p.<T>get(attributes[len-1]), attributeStart, attributeEnd);
            };
        } else {
            return null;
        }
    }

    public static <E, T>Specification<E> findByAttributeIn(Collection<T> attributeValues, String... attributes) {
        
        if(attributes.length == 1) {
            return (root, cq, cb) -> {
                return cb.in(root.get(attributes[0])).value(attributeValues);
            };
        }
        
        if(attributes.length > 1) {

            int len = attributes.length;
            return (root, cq, cb) -> {

                String first = attributes[0];
                Path<?> p = root.get(first);

                for(int i = 1; i < len-1; i++) {
                    p = p.get(attributes[i]);
                }
                In<T> in = cb.in(p.<T>get(attributes[len-1]));
                attributeValues.forEach(v -> in.value(v));
                return in;
            };
        } else {
            return null;
        }
    }
}