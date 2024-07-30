"""
Amenity controller module
"""

from flask import abort, request, Blueprint
from solutions.solution.src.models.amenity import Amenity



amenities_bp = Blueprint('amenities', __name__)

@amenities_bp.route('/', methods=['GET'])
def get_amenities():
    """Returns all amenities"""
    amenities: list[Amenity] = Amenity.get_all()
    return [amenity.to_dict() for amenity in amenities]


@amenities_bp.route('/', methods=['POST'])
def create_amenity():
    """Creates a new amenity"""
    data = request.get_json()
    try:
        amenity = Amenity.create(data)
    except KeyError as e:
        abort(400, f"Missing field: {e}")
    except ValueError as e:
        abort(400, str(e))
    return amenity.to_dict(), 201


@amenities_bp.route('/<amenity_id>', methods=['GET'])
def get_amenity_by_id(amenity_id: str):
    """Returns a amenity by ID"""
    amenity: Amenity | None = Amenity.get(amenity_id)
    if not amenity:
        abort(404, f"Amenity with ID {amenity_id} not found")
    return amenity.to_dict()


@amenities_bp.route('/<amenity_id>', methods=['PUT'])
def update_amenity(amenity_id: str):
    """Updates a amenity by ID"""
    data = request.get_json()
    updated_amenity: Amenity | None = Amenity.update(amenity_id, data)
    if not updated_amenity:
        abort(404, f"Amenity with ID {amenity_id} not found")
    return updated_amenity.to_dict()


@amenities_bp.route('/<amenity_id>', methods=['DELETE'])
def delete_amenity(amenity_id: str):
    """Deletes a amenity by ID"""
    if not Amenity.delete(amenity_id):
        abort(404, f"Amenity with ID {amenity_id} not found")
    return "", 204
