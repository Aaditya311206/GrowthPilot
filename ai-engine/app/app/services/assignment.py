import hashlib
from sqlalchemy.orm import Session
from ..models import ExperimentAssignment

def get_hash_assignment(db: Session, customer_id: str, experiment_id: str, traffic_split: int = 50) -> str:
    """
    Idempotent MD5 hash-based assignment.
    """
    # 1. Check if assignment already exists
    existing = db.query(ExperimentAssignment).filter_by(
        customerId=customer_id, 
        experimentId=experiment_id
    ).first()
    
    if existing:
        return existing.arm

    # 2. Hash-based assignment
    hash_key = f"{customer_id}:{experiment_id}"
    md5_hash = hashlib.md5(hash_key.encode('utf-8')).hexdigest()
    
    # Take the last 8 characters of the hex string, convert to int, and modulo 100
    mod_val = int(md5_hash[-8:], 16) % 100
    
    arm = "treatment" if mod_val < traffic_split else "control"

    # 3. Persist assignment
    new_assignment = ExperimentAssignment(
        experimentId=experiment_id,
        customerId=customer_id,
        arm=arm
    )
    db.add(new_assignment)
    db.commit()
    db.refresh(new_assignment)

    return arm
