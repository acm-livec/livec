import React from 'react'
import { useNavigate } from "react-router";
import { useContext, useState, useEffect } from "react"
import { postRecommednation } from '@utils/api-handlers/suggestions';
import { logger } from '@utils/logger'
import { UserContext } from '@context/UserProvider';
/**
 * Implement reviewer functionalities here
 * 
 * @see useAssociateEditor for example implementation in `features/associate-editor/useAssociateEditor`
 * 
 * 
 */
export default function useReviewer() {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const reviewerId = user.id


    const recommend = async (id, {decision}) => {

        console.log(id, decision)
        await postRecommednation(id, reviewerId, decision)
        navigate(0)

    }

    return {recommend}
}
