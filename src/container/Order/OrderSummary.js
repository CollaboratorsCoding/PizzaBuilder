import React from 'react'

import {Card, Icon} from 'antd';

const OrderSummary = (props) => {
    let summary = null;
    if (props.ingredients.length > 0) {
        summary = <Card
            title={props.inProfile
            ? "Pizza Order #" + props.inProfile
            : "Pizza Order"}
            bordered={false}>
            <table className='summary'>
                <tbody>
                    {props
                        .ingredients
                        .map(ingredient => {
                            return (
                                <tr key={ingredient.value}>
                                    {props.inModal
                                        ? null
                                        : <td>
                                            <div className='remove--ingredient' onClick={() => props.remove(ingredient)}><Icon type="minus-circle-o"/></div>
                                        </td>}
                                    <td>
                                        <img className='ingredient--order--image' src={'/' + ingredient.img} alt=""/>
                                    </td>
                                    <td>
                                        <div className='ingredient--order--caption'>{ingredient.value}</div>
                                    </td>
                                    <td>
                                        <div className='ingredient--order--price'>
                                            Цена : {ingredient.price}
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
                <tfoot>
                    <tr>
                        <td className='total--price'>
                            Полная цена: {Math.round((Number(props.totalPrice) + 0.00001) * 100) / 100}
                        </td>
                    </tr>
                    {props.date
                        ? <tr>
                                <td className='total--price'>
                                    Дата: {props.date}
                                </td>
                            </tr>
                        : null}
                </tfoot>
            </table>
        </Card>

    }
    return (
        <div className={props.inProfile
            ? 'order--card'
            : null}>{summary}</div>
    )
}
export default OrderSummary
